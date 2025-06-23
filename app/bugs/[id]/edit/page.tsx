'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { BugForm } from '@/components/bug-form';
import { getBugById } from '@/lib/mock-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EditBugPage() {
  const params = useParams();
  const router = useRouter();
  const bugId = params.id as string;
  const bug = getBugById(bugId);

  if (!bug) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Bug Not Found</h1>
            <p className="text-gray-600 mt-2">The bug report you're trying to edit doesn't exist.</p>
            <Link href="/dashboard">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    console.log('Updating bug:', data);
    // In a real app, this would make an API call
    setTimeout(() => {
      router.push(`/bugs/${bugId}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href={`/bugs/${bugId}`} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Bug Details
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">Edit Bug Report</h1>
          <p className="text-gray-600 mt-1">Update the bug report details</p>
        </div>

        <BugForm bug={bug} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}