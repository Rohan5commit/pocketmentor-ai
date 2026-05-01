import Link from 'next/link';
import { Wallet } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">PocketMentor <span className="text-blue-600">AI</span></span>
          </Link>
          <div className="flex gap-4">
            <Link href="/onboarding" className="text-sm font-medium text-gray-700 hover:text-blue-600">Get Started</Link>
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">Demo Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}