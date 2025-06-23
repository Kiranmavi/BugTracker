'use client';

import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { BugForm } from '@/components/bug-form';

export default function NewBugPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log('Creating bug:', data);
    // In a real app, this would make an API call
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report New Bug</h1>
          <p className="text-gray-600 mt-1">Create a detailed bug report to help track and resolve issues</p>
        </div>

        <BugForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}