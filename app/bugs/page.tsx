'use client';

import { Navigation } from '@/components/navigation';
import { BugCard } from '@/components/bug-card';
import { Button } from '@/components/ui/button';
import { getBugs } from '@/lib/mock-data';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function BugsPage() {
  const bugs = getBugs();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Bugs</h1>
            <p className="text-gray-600 mt-1">Complete list of all bug reports</p>
          </div>
          <Link href="/bugs/new">
            <Button className="mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Report New Bug
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} />
          ))}
        </div>
      </div>
    </div>
  );
}