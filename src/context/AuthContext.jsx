'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

// Initial dummy data for users
const initialUsers = [
  { id: 1, username: 'student_user', email: 'student@example.com', password: 'password123', role: 'student' },
  { id: 2, username: 'employer_user', email: 'employer@example.com', password: 'password123', role: 'employer' }
];

// Initial dummy data for groups
const initialGroups = [
  { id: 1, name: 'Machine Learning', description: 'Discussion about ML algorithms and applications', members: [1] },
  { id: 2, name: 'CSUS', description: 'Computer Science Undergraduate Society', members: [1] },
  { id: 3, name: 'Web Development', description: 'All things web dev related', members: [1] }
];

// Create the auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [groups, setGroups] = useState(initialGroups);
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Signup function
  const signup = (username, email, fullName, role) => {
    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      fullName,
      role
    };
    
    setUsers([...users, newUser]);
    setUser(newUser);
    
    // User is immediately logged in, so update their groups
    setUserGroups([]);
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserGroups([]);
    router.push('/');
  };

  // Join a group
  const joinGroup = (groupId) => {
    if (!user) return false;
    
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { ...group, members: [...group.members, user.id] } 
          : group
      )
    );
    
    // Update userGroups immediately
    const updatedGroup = groups.find(group => group.id === groupId);
    if (updatedGroup) {
      setUserGroups(prev => [...prev, updatedGroup]);
    }
    
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signup, 
      logout,
      groups,
      userGroups,
      joinGroup
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}