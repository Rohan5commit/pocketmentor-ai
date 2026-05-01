import Link from 'next/link';
import { ArrowRight, BrainCircuit, Target, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-16">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Master Your Money with <span className="text-blue-600">AI Guidance</span>
        </h1>
        <p className="text-xl text-gray-600">
          PocketMentor AI is a student financial planner that turns your habits into actionable advice. Set goals, understand your spending, and build a stress-free financial future.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/onboarding" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2 transition-all">
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/dashboard" className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all">
            View Demo
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full text-left pt-12">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">AI-Powered Insights</h3>
          <p className="text-gray-600">Get personalized feedback on your spending patterns and learn how to optimize your budget dynamically.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Smart Savings Plan</h3>
          <p className="text-gray-600">Tell us what you are saving for, and we&apos;ll build a realistic roadmap to get you there without starving.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Financial Literacy</h3>
          <p className="text-gray-600">Understand complex money concepts easily. We explain things clearly so you can make informed decisions.</p>
        </div>
      </div>
    </div>
  );
}