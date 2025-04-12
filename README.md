# Branch - Social Media Platform

#### **Check out our app**- [Branch](https://branch-zeta.vercel.app/)

This README should serve as a comprehensive overview of the codebase, explaining structure, components, and relationships between different moving parts.

## project overview

branch is a niche social media network built using react and next.js. it's designed to connect students with each other, clubs, events, and job opportunities.

## tech stack

- **react 19**: core ui library
- **next.js 15**: react framework with app router
- **tailwindcss 4**: utility-first css framework
- **context api**: for state management (auth/user data)

## project structure

the project follows the next.js app router structure with a clear separation of concerns:

```
branch/
├── public/              # static assets
├── src/
│   ├── app/             # app router pages
│   │   ├── auth/        # authentication pages
│   │   ├── dashboard/   # dashboard pages
│   │   ├── globals.css  # global styles
│   │   ├── layout.jsx   # root layout
│   │   └── page.jsx     # landing page
│   ├── components/      # reusable components
│   │   ├── auth/        # auth-related components
│   │   └── layout/      # layout components
│   └── context/         # context providers
└── ...config files      # next.js and other config files
```

## getting started

to run the project locally:

```bash
# install dependencies
npm install

# run development server
npm run dev
```

open [http://localhost:3000](http://localhost:3000) in your browser.

## no backend

this project is designed for an HCI course, which means there's no real backend. instead:

- user data is stored in memory using react's context api
- when a user signs up or logs in, their session persists only while the app is running
- all functionality that would normally require server-side operations is simulated client-side

this approach allows us to focus on the ui and user experience without the complexity of a real backend.

## authentication system

the auth system is implemented using react context to manage users, their roles, and session state.

### authcontext.jsx

the heart of our auth system is the `AuthContext` which manages:

- user authentication state
- user signup and login
- user roles (student/employer)
- group membership

```jsx
// src/context/AuthContext.jsx (simplified)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  
  // Signup function
  const signup = (username, email, fullName, role) => {
    const newUser = {
      id: users.length + 1,
      username,
      email,
      fullName,
      role
    };
    
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    router.push('/');
  };
  
  // ... other auth-related functions
  
  return (
    <AuthContext.Provider value={{ 
      user, loading, signup, logout, groups, userGroups, joinGroup
    }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### role-based access control

the app implements two user roles:

1. **student**: access to everything (home feed, events, job board, groups)
2. **employer**: restricted access (only events and job board)

the sidebar and routes adjust dynamically based on the user's role:

```jsx
// src/components/layout/Sidebar.jsx (simplified)
const navItems = [
  ...(user.role === 'student' ? [{ name: 'HOME', path: '/dashboard/home' }] : []),
  { name: 'EVENTS', path: '/dashboard/events' },
  { name: 'JOB BOARD', path: '/dashboard/jobs' },
];
```

and restricted routes redirect unauthorized users:

```jsx
// src/app/dashboard/home/page.jsx (simplified)
export default function Home() {
  const { user } = useAuth();
  
  // Redirect employer users since they shouldn't have access to home
  if (user?.role === 'employer') {
    return (
      <div className="text-center">
        <h1>access restricted</h1>
        <p>employers don't have access to the home feed.</p>
      </div>
    );
  }
  
  // Regular home feed content...
}
```

## routing structure

the app uses next.js app router with the following primary routes:

### public routes

- `/` - landing page
- `/auth/login` - login page
- `/auth/signup` - signup page

### protected routes

all protected routes are under `/dashboard/` and checked by the `AuthCheck` component:

- `/dashboard/home` - home feed (students only)
- `/dashboard/events` - events page 
- `/dashboard/jobs` - job board
- `/dashboard/groups` - groups discovery page (students only)
- `/dashboard/groups/[groupId]` - specific group page (students only)
- `/dashboard/profile` - user profile page

the `AuthCheck` component ensures only authenticated users can access dashboard pages:

```jsx
// src/components/layout/AuthCheck.jsx
export default function AuthCheck({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
```

this component is applied in the dashboard layout:

```jsx
// src/app/dashboard/layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-[#242424]">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthCheck>
  );
}
```

## component structure

### layout components

1. **sidebar.jsx** - the main navigation sidebar that adapts based on user role
2. **authcheck.jsx** - protects routes from unauthorized access

### auth components

1. **loginform.jsx** - handles user login
2. **signupform.jsx** - handles user signup with role selection

### page components

each route in the `/app` directory has its own page component, which:
- handles specific functionality for that section
- manages local state for that view
- imports components needed for that page

## state management approach

the app uses react's context api for global state management:

### authcontext

manages authentication state, user information, and basic user actions:

```jsx
export function useAuth() {
  return useContext(AuthContext);
}

// usage in components
const { user, logout } = useAuth();
```

### component-level state

each page component manages its own local state, such as:
- active tabs
- sorting options
- form data
- modal states

for example, the home page manages several pieces of local state:

```jsx
export default function Home() {
  const [activeTab, setActiveTab] = useState('feed'); 
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // component logic...
}
```

## styling approach

the project uses tailwindcss with:

1. a global css file (`src/app/globals.css`) that includes:
   - tailwind imports
   - css variables for common colors
   - global styles

2. inline tailwind classes for component-specific styling

the color scheme uses css variables like:
```css
:root {
  --background-sidebar: #1a1a1a;
  --background-main: #242424;
  --background-card: #2d2d2d;
  --text-primary: #f5f5f5;
  --text-secondary: #a0a0a0;
  --accent-button: #4caf9e;
  --item-hover: #333333;
  --border-color: #3a3a3a;
}
```

these can be used with tailwind's arbitrary values:
```jsx
<div className="bg-[#1a1a1a]">...</div>
```

## detailed component breakdown

### sidebar component

the sidebar (`components/layout/Sidebar.jsx`) serves as the main navigation for the app:

- shows user information and logout button
- displays navigation links based on user role
- shows joined groups (for students)
- provides quick access to find more groups

```jsx
<div className="w-64 h-screen bg-[#1a1a1a] flex flex-col border-r border-[#3a3a3a]">
  {/* Logo/branding */}
  <div className="p-4 mb-2">
    <h1 className="text-xl font-bold text-white">Branch</h1>
  </div>
  
  {/* Groups section (students only) */}
  {user.role === 'student' && (
    <>
      <div className="px-4 mb-2">
        <h2 className="text-[#888888] mb-2">GROUPS</h2>
        <div className="h-28 overflow-y-auto pr-2 mb-2">
          {/* Group links */}
        </div>
        <Link
          href="/dashboard/groups"
          className="flex items-center justify-center p-2 text-[#4caf9e]">
          + FIND MORE
        </Link>
      </div>
      <div className="border-b border-[#3a3a3a] mb-4 mx-4"></div>
    </>
  )}
  
  {/* Navigation links */}
  <nav className="flex-1 px-4">
    {navItems.map((item) => (
      <Link key={item.path} href={item.path} className="...">
        {item.name}
      </Link>
    ))}
  </nav>
  
  {/* User profile section */}
  <div className="mt-auto border-t border-[#3a3a3a] p-4">
    {/* user info and logout button */}
  </div>
</div>
```

### signup form

the signup form (`components/auth/SignupForm.jsx`) handles:

- role selection (student/employer)
- collecting user information
- validation
- account creation

it dynamically changes fields based on selected user type:

```jsx
{/* Form content */}
<div className="p-8 bg-[#1a1a1a]">
  <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
    {/* Student Form */}
    {userType === 'student' && (
      <>
        {/* Student-specific fields */}
      </>
    )}

    {/* Employer Form */}
    {userType === 'employer' && (
      <>
        {/* Employer-specific fields */}
      </>
    )}

    <button
      type="submit"
      className="col-span-12 py-3 bg-[#4caf9e] text-white...">
      Create Account
    </button>
  </form>
</div>
```

## page components

### home page

the home feed (`app/dashboard/home/page.jsx`):
- restricted to students only
- shows posts from followed users/groups
- has tabs for feed and explore views
- includes post creation button
- supports sorting options

```jsx
export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Student-only check
  if (user?.role === 'employer') {
    return <div className="text-center">access restricted</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">home</h1>
        {/* Search bar */}
      </div>
      
      {/* Tabs */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'explore' ? 'bg-[#3a3a3a]' : 'bg-[#2d2d2d]'}`}
            onClick={() => setActiveTab('explore')}>
            Explore
          </button>
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'feed' ? 'bg-[#3a3a3a]' : 'bg-[#2d2d2d]'}`}
            onClick={() => setActiveTab('feed')}>
            Feed
          </button>
        </div>
      </div>
      
      {/* Post creation button */}
      <div className="mb-4">
        <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md">
          + New Post
        </button>
      </div>
      
      {/* Sort options */}
      <div className="flex justify-end mb-2 relative">
        {/* sort dropdown */}
      </div>
      
      {/* Posts feed */}
      <div className="space-y-4 overflow-y-auto">
        {/* posts map */}
      </div>
    </div>
  );
}
```

### job board

the job board (`app/dashboard/jobs/page.jsx`):
- accessible to both students and employers
- shows job listings
- provides job details on selection
- allows employers to post new jobs

```jsx
export default function Jobs() {
  const { user } = useAuth();
  const [jobs] = useState(dummyJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterOption, setFilterOption] = useState('Relevant');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">job board</h1>
        {/* Search bar */}
        
        {user.role === 'employer' && (
          <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-lg">
            New Job Posting
          </button>
        )}
      </div>
      
      {/* Filter options */}
      
      {/* Job listings grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Job listings */}
        </div>
        
        <div className="md:col-span-1">
          {/* Saved jobs, applied jobs */}
        </div>
      </div>
      
      {/* Job details modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Job details */}
        </div>
      )}
    </div>
  );
}
```

## dummy data

since this is a frontend-only project, we use dummy data stored in component and context files:

### users

```javascript
// Initial dummy data for users
const initialUsers = [
  { id: 1, username: 'student_user', email: 'student@example.com', password: 'password123', role: 'student' },
  { id: 2, username: 'employer_user', email: 'employer@example.com', password: 'password123', role: 'employer' }
];
```

### groups

```javascript
// Initial dummy data for groups
const initialGroups = [
  { id: 1, name: 'Machine Learning', description: 'Discussion about ML algorithms and applications', members: [1] },
  { id: 2, name: 'CSUS', description: 'Computer Science Undergraduate Society', members: [1] },
  { id: 3, name: 'Web Development', description: 'All things web dev related', members: [1] }
];
```

similar dummy data exists for:
- posts
- events
- job listings


