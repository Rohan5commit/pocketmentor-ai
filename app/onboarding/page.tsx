"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { defaultUserData } from '@/lib/demoData';

export default function Onboarding() {
  const router = useRouter();
  const [formData, setFormData] = useState(defaultUserData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API save
    localStorage.setItem('pocketmentor_user', JSON.stringify(formData));
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Let&apos;s build your financial profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Monthly Income/Allowance ($)</label>
              <input 
                type="number" 
                value={formData.monthlyIncome}
                onChange={e => setFormData({...formData, monthlyIncome: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Recurring Expenses ($)</label>
              <input 
                type="number" 
                value={formData.recurringExpenses}
                onChange={e => setFormData({...formData, recurringExpenses: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Savings Goal Target ($)</label>
              <input 
                type="number" 
                value={formData.savingsGoal}
                onChange={e => setFormData({...formData, savingsGoal: Number(e.target.value)})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">What are you saving for?</label>
              <input 
                type="text" 
                value={formData.goalName}
                onChange={e => setFormData({...formData, goalName: e.target.value})}
                placeholder="e.g., Spring Break Trip"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Describe your spending habits (Be honest!)</label>
            <textarea 
              rows={4}
              value={formData.spendingHabits}
              onChange={e => setFormData({...formData, spendingHabits: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none text-gray-900" 
              placeholder="I tend to buy a lot of snacks and occasionally splurge on clothes..."
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing Profile...' : 'Generate Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}