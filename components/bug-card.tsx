import Link from 'next/link';
import { Calendar, User, MessageSquare } from 'lucide-react';
import { Bug, getUserById } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useBugStore from '../store/bugStore';

interface BugCardProps {
  bug: Bug;
}

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

export function BugCard({ bug }: BugCardProps) {
  const assignee = bug.assigneeId ? getUserById(bug.assigneeId) : null;
  const reporter = getUserById(bug.reporterId);
  const router = useRouter();
  const setBugNo = useBugStore((state) => state.setBugNo);

  const handleBugsDetails=()=>{
    setBugNo(bug.id);
    router.push(`/bugs/details/`);
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div 
            onClick={handleBugsDetails}
              // href={`/bugs/${bug.id}`}
              className="text-lg font-semibold cursor-pointer text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
            >
              {bug.title}
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {bug.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className={cn('text-xs font-medium', statusColors[bug.status])}>
            {bug.status.charAt(0).toUpperCase() + bug.status.slice(1).replace('-', ' ')}
          </Badge>
          <Badge className={cn('text-xs font-medium', priorityColors[bug.priority])}>
            {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)} Priority
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {bug.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {assignee && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{assignee.name}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{bug.createdAt.toLocaleDateString("en-US")}</span>
            </div>
          </div>
          
          {bug.comments.length > 0 && (
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{bug.comments.length}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}