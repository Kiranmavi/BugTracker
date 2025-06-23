export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'developer' | 'qa' | 'manager' | 'admin';
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  reporterId: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  bugId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    role: 'developer',
  },
  {
    id: '2',
    name: 'Bob Smith',  
    email: 'bob@company.com',
    role: 'qa',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@company.com', 
    role: 'manager',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@company.com',
    role: 'developer',
  },
  {
    id: '5',
    name: 'Eve Taylor',
    email: 'eve@company.com',
    role: 'admin',
  },
];

export const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'Login form validation not working correctly',
    description: 'When submitting the login form with invalid credentials, the error message is not displayed properly. The form should show clear validation errors for empty fields and invalid email formats.',
    status: 'open',
    priority: 'high',
    assigneeId: '1',
    reporterId: '2',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T14:20:00Z'),
    tags: ['frontend', 'authentication', 'validation'],
    comments: [
      {
        id: '1',
        bugId: '1',
        userId: '2',
        content: 'I noticed this issue affects both desktop and mobile versions.',
        createdAt: new Date('2024-01-15T11:00:00Z'),
      },
      {
        id: '2',
        bugId: '1',
        userId: '1',
        content: 'Thanks for reporting! I will investigate the validation logic.',
        createdAt: new Date('2024-01-15T14:20:00Z'),
      }
    ],
  },
  {
    id: '2',
    title: 'Dashboard loading performance issue',
    description: 'The main dashboard takes too long to load when there are many items. Users experience delays of 3-5 seconds before seeing content.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: '4',
    reporterId: '3',
    createdAt: new Date('2024-01-14T09:15:00Z'),
    updatedAt: new Date('2024-01-16T16:45:00Z'),
    tags: ['performance', 'dashboard', 'backend'],
    comments: [
      {
        id: '3',
        bugId: '2',
        userId: '4',
        content: 'Working on optimizing the database queries. Should have an update soon.',
        createdAt: new Date('2024-01-16T16:45:00Z'),
      }
    ],
  },
  {
    id: '3',
    title: 'Mobile navigation menu not closing',
    description: 'On mobile devices, the hamburger navigation menu does not close automatically when a user selects a menu item.',
    status: 'resolved',
    priority: 'low',
    assigneeId: '1', 
    reporterId: '5',
    createdAt: new Date('2024-01-12T14:20:00Z'),
    updatedAt: new Date('2024-01-13T10:30:00Z'),
    tags: ['mobile', 'navigation', 'ui'],
    comments: [],
  },
  {
    id: '4',
    title: 'Critical security vulnerability in user authentication',
    description: 'Discovered a potential security flaw that could allow unauthorized access to user accounts. This needs immediate attention.',
    status: 'open',
    priority: 'critical',
    assigneeId: '5',
    reporterId: '2',
    createdAt: new Date('2024-01-16T08:00:00Z'),
    updatedAt: new Date('2024-01-16T08:00:00Z'),
    tags: ['security', 'authentication', 'urgent'],
    comments: [],
  },
  {
    id: '5',
    title: 'Export functionality not working in reports',
    description: 'Users cannot export reports to CSV or PDF format. The export buttons are clickable but no download occurs.',
    status: 'closed',
    priority: 'medium',
    assigneeId: '4',
    reporterId: '3',
    createdAt: new Date('2024-01-10T11:30:00Z'),
    updatedAt: new Date('2024-01-11T15:45:00Z'),
    tags: ['reports', 'export', 'feature'],
    comments: [
      {
        id: '4',
        bugId: '5',
        userId: '4',
        content: 'Fixed the export service configuration. All formats now working properly.',
        createdAt: new Date('2024-01-11T15:45:00Z'),
      }
    ],
  },
];

export const getUsers = (): User[] => mockUsers;
export const getUserById = (id: string): User | undefined => mockUsers.find(user => user.id === id);
export const getBugs = (): Bug[] => mockBugs;
export const getBugById = (id: string): Bug | undefined => mockBugs.find(bug => bug.id === id);