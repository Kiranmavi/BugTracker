'use client';

import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBugs, getUsers } from '@/lib/mock-data';
import { User, Mail, Shield, Bug, Settings } from 'lucide-react';

export default function ProfilePage() {
  // Mock current user - in a real app, this would come from authentication
  const currentUser = getUsers()[0]; // Alice Johnson
  const bugs = getBugs();
  const userBugs = bugs.filter(bug => bug.assigneeId === currentUser.id || bug.reporterId === currentUser.id);
  const assignedBugs = bugs.filter(bug => bug.assigneeId === currentUser.id);
  const reportedBugs = bugs.filter(bug => bug.reporterId === currentUser.id);

  const roleColors = {
    developer: 'bg-blue-100 text-blue-800',
    qa: 'bg-green-100 text-green-800',
    manager: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={currentUser.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={currentUser.email} readOnly />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div>
                    <Badge className={roleColors[currentUser.role]}>
                      <Shield className="h-3 w-3 mr-1" />
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activity Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-5 w-5" />
                  <span>Bug Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userBugs.length}</div>
                    <div className="text-sm text-gray-600">Total Involved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{assignedBugs.length}</div>
                    <div className="text-sm text-gray-600">Assigned to Me</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{reportedBugs.length}</div>
                    <div className="text-sm text-gray-600">Reported by Me</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBugs.slice(0, 5).map((bug) => (
                    <div key={bug.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {bug.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {bug.assigneeId === currentUser.id ? 'Assigned' : 'Reported'} • {bug.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  
                  {userBugs.length === 0 && (
                    <p className="text-sm text-gray-500">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}