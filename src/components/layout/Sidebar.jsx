'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import dummyGroups from '@/data/dummyGroups';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, userGroups, logout } = useAuth();
  

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
          <div className="px-4 mb-2">
            <nav className="flex-1 px-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`block p-3 mb-3 rounded text-center uppercase text-white ${
                    pathname === item.path 
                      ? 'bg-[#333333]' 
                      : 'bg-[#666666] hover:bg-[#555555]'

                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-b border-[#3a3a3a] mt-4 mb-3 mx-2"></div>
            <h2 className="text-[#888888] text-bold mb-2">GROUPS</h2>
            <div className="sidebar-group h-fit-content max-h-[30vh] overflow-y-auto pr-2 mb-5">
              {userGroups.length === 0 ? (
                <div className="text-center text-sm text-[#888888]">No groups joined</div>
              ) : (
                userGroups.map((group) => (
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
                ))
              )}
            </div>
            <Link
              href="/dashboard/groups"
              className="flex items-center justify-center p-1 text-[#4caf9e] border border-[#444444] rounded mb-1 hover:bg-[#333333]"
            >
              + FIND MORE
            </Link>
            </div>
        )}
      
      
      
      
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
          className="flex items-center text-sm mt-2 text-red-400"
        >
        Log Out
        </button>
      </div>
    </div>
  );
}