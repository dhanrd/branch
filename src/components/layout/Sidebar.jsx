'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, userGroups, logout } = useAuth();
  // Hardcoded group data
  const dummyGroups = [
    { id: 1, name: 'MACHINE LEARNING' },
    { id: 2, name: 'CSUS' },
    { id: 3, name: 'WEB DEVELOPMENT' }
  ];

  if (!user) return null;

  // Determine which nav items to show based on user role
  const navItems = [
    ...(user.role === 'student' ? [{ name: 'HOME', path: '/dashboard/home' }] : []),
    { name: 'EVENTS', path: '/dashboard/events' },
    { name: 'JOB BOARD', path: '/dashboard/jobs' },
  ];

  return (
    <div className="w-64 h-screen bg-[#1a1a1a] flex flex-col border-r border-[#3a3a3a]">
      <div className="p-4 mb-2">
        <h1 className="text-xl font-bold text-white">Branch</h1>
      </div>
      
      {user.role === 'student' && (
        <>
          <div className="px-4 mb-2">
            <h2 className="text-[#888888] mb-2">GROUPS</h2>
            <div className="h-28 overflow-y-auto pr-2 mb-2">
              {dummyGroups.map((group) => (
                <Link 
                  href={`/dashboard/groups/${group.id}`}
                  key={group.id}
                  className={`block p-4 mb-3 rounded text-center text-white uppercase font-medium ${
                    pathname === `/dashboard/groups/${group.id}` 
                      ? 'bg-[#444444]' 
                      : 'bg-[#666666]'
                  }`}
                >
                  {group.name}
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard/groups"
              className="flex items-center justify-center p-2 text-[#4caf9e] border border-[#444444] rounded mb-4 hover:bg-[#333333]"
            >
              + FIND MORE
            </Link>
          </div>
          <div className="border-b border-[#3a3a3a] mb-4 mx-4"></div>
        </>
      )}
      
      <nav className="flex-1 px-4">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={`block p-3 mb-4 rounded uppercase text-white ${
              pathname === item.path 
                ? 'bg-[#333333]' 
                : 'bg-[#444444] hover:bg-[#555555]'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto border-t border-[#3a3a3a] p-4">
        <Link href="/dashboard/profile">
          <div className="flex items-center mb-2 cursor-pointer hover:bg-[#222222] p-2 rounded-md transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#555555] mr-3"></div>
            <div>
              <div className="text-white lowercase">{user.username}</div>
              <div className="text-[#888888] text-sm">{user.role}</div>
            </div>
          </div>
        </Link>
        
        <button 
          onClick={logout}
          className="flex items-center mt-2 text-red-400"
        >
          <span className="rounded-full w-6 h-6 flex items-center justify-center bg-black mr-2">N</span>
          out
        </button>
      </div>
    </div>
  );
}