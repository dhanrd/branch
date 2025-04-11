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
    <div className="w-80 h-screen-0 bg-[#1a1a1a] flex flex-col border-r border-[#3a3a3a]">
      <div className="p-4 mb-4">
        <h1 className="text-2xl font-bold text-white">Branch</h1>
      </div>
      
      <nav className="px-4 mb-4">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={`block p-4 mb-4 w-58 h-12 left-[32px] relative rounded-md shadow-[0px_1px_15px_0px_rgba(17,17,17,1.00)] overflow-hidden 
              uppercase text-center justify-center font-bold leading-tight tracking-wide text-white ${
              pathname === item.path 
                ? 'bg-[#303030] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)]' 
                : 'bg-[#6C6C6C] hover:bg-[#555555]'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-2 border-[#3a3a3a] mb-4 mx-4"></div>

      {user.role === 'student' && (
        <>
          <div className="px-4 mb-2">

            <h2 className="text-[#888888] mb-2">GROUPS</h2>
            <div className="h-28 overflow-y-auto pr-2 mb-2">
              {userGroups.map((group) => (
                <Link 
                  href={`/dashboard/groups/${group.id}`}
                  key={group.id}
                  className={`block p-4 mb-4 w-58 h-18 left-[32px] relative rounded-md shadow-[0px_1px_15px_0px_rgba(17,17,17,1.00)] overflow-hidden 
                    uppercase text-center justify-center font-bold leading-tight content-center tracking-wide text-white  ${
                    pathname === `/dashboard/groups/${group.id}` 
                      ? 'bg-[#303030] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.25)]' 
                      : 'bg-[#6C6C6C] hover:bg-[#555555]'
                  }`}
                >
                  {group.name}
                </Link>
              ))}
            </div>
            <Link
              href="/dashboard/groups"
              className="mt-3 mb-1 flex items-center justify-center p-2 text-[#4caf9e] border border-[#444444] shadow-[0px_1px_15px_0px_rgba(17,17,17,1.00)] rounded hover:bg-[#333333]"
            >
              + FIND MORE
            </Link>
          </div>
          
        </>
      )}
      

      
      <div className="absolute bottom-0 w-80 mt-auto border-t border-[#3a3a3a] p-4">
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
          className="flex items-center mt-2 text-red-400 hover:text-red-200 cursor-pointer"
        >

        Log Out

        </button>
      </div>
    </div>


  );
}
