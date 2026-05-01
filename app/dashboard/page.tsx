"use client";

import { useEffect, useState } from 'react';
import { defaultUserData } from '@/lib/demoData';
import { AlertTriangle, TrendingUp, CheckCircle, Lightbulb, PiggyBank, RefreshCw } from 'lucide-react';

type AIResponse = {
  budgetSummary: string;
  savingsRoadmap: string;
  spendingAlert: string;
  actionSteps: string[];
  explainer: {
    concept: string;
    explanation: string;
  };
};

export default function Dashboard() {
  const [userData, setUserData] = useState(defaultUserData);
  const [insights, setInsights] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [simulatedReduction, setSimulatedReduction] = useState(20);

  useEffect(() => {
    const saved = localStorage.getItem('pocketmentor_user');
    if (saved) {
      setUserData(JSON.parse(saved));
    }
    fetchInsights(saved ? JSON.parse(saved) : defaultUserData);
  }, []);

  const fetchInsights = async (data: typeof defaultUserData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const aiData = await res.json();
      setInsights(aiData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const remaining = userData.monthlyIncome - userData.recurringExpenses;
  
  const handleSimulate = () => {
    // Re-run AI with adjusted habits
    const simulatedData = {
      ...userData,
      spendingHabits: `I am actively cutting down my discretionary spending like dining out by ${simulatedReduction}%.`
    };
    fetchInsights(simulatedData);
    setSimulatorMode(false);
  };

  if (loading || !insights) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <RefreshCw className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium text-lg">AI is analyzing your financial profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Monthly Disposable Income</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">${remaining}</p>
          <p className="text-sm text-gray-500 mt-1">Income (${userData.monthlyIncome}) - Expenses (${userData.recurringExpenses})</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Goal: {userData.goalName}</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">${userData.savingsGoal}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Just started! Keep it up.</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100 flex flex-col justify-center">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-orange-900">Spending Alert</p>
              <p className="text-sm text-orange-800 mt-1">{insights.spendingAlert}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> AI Budget Summary
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{insights.budgetSummary}</p>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                <PiggyBank className="h-5 w-5" /> Savings Roadmap
              </h3>
              <p className="text-blue-800">{insights.savingsRoadmap}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-600" /> Action Steps
            </h2>
            <ul className="space-y-4">
              {insights.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-6 w-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 pt-0.5">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-sm text-white">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5" /> Explainer: {insights.explainer.concept}
            </h3>
            <p className="text-indigo-50 text-sm leading-relaxed">
              {insights.explainer.explanation}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Scenario Simulator</h3>
            <p className="text-sm text-gray-600 mb-4">What if you cut your discretionary spending?</p>
            
            {simulatorMode ? (
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>Reduce spending by:</span>
                  <span className="text-blue-600 font-bold">{simulatedReduction}%</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="50" 
                  step="5"
                  value={simulatedReduction}
                  onChange={(e) => setSimulatedReduction(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex gap-2">
                  <button onClick={handleSimulate} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Apply</button>
                  <button onClick={() => setSimulatorMode(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setSimulatorMode(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                Simulate New Scenario
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}