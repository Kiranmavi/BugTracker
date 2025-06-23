'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { getBugById, getUserById } from '@/lib/mock-data';
import { Calendar, User, MessageSquare, Edit, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors = {
  open: 'bg-red-100 text-red-800 border-red-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200',
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-orange-100 text-orange-800 border-orange-200',
  high: 'bg-red-100 text-red-800 border-red-200',
  critical: 'bg-purple-100 text-purple-800 border-purple-200',
};

export default function BugDetailPage() {
  const params = useParams();
  const bugId = params.id as string;
  const bug = getBugById(bugId);
  const [newComment, setNewComment] = useState('');

  if (!bug) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Bug Not Found</h1>
            <p className="text-gray-600 mt-2">The bug report you're looking for doesn't exist.</p>
            <Link href="/dashboard">
              <Button className="mt-4">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const assignee = bug.assigneeId ? getUserById(bug.assigneeId) : null;
  const reporter = getUserById(bug.reporterId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      // In a real app, this would make an API call
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{bug.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Bug #{bug.id}</span>
                <span>Created {bug.createdAt.toLocaleDateString()}</span>
                <span>Updated {bug.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
            <Link href={`/bugs/${bug.id}/edit`}>
              <Button className="mt-4 sm:mt-0">
                <Edit className="h-4 w-4 mr-2" />
                Edit Bug
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{bug.description}</p>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Comments ({bug.comments.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bug.comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet.</p>
                ) : (
                  bug.comments.map((comment) => {
                    const commenter = getUserById(comment.userId);
                    return (
                      <div key={comment.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">
                            {commenter?.name || 'Unknown User'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    );
                  })
                )}

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Add Comment</h4>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    rows={3}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                  <Badge className={cn('text-sm font-medium', statusColors[bug.status])}>
                    {bug.status.charAt(0).toUpperCase() + bug.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Priority</h4>
                  <Badge className={cn('text-sm font-medium', priorityColors[bug.priority])}>
                    {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)} Priority
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assignee</h4>
                  {assignee ? (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Reporter</h4>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{reporter?.name || 'Unknown'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Created</h4>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{bug.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {bug.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {bug.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}