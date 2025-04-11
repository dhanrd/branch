'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Joined() {
  const { user, joinGroup, userGroups} = useAuth();
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className='flex'>
      {/* Joined groups window view */}  
      <div className="relative md:flex-grow pr-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">JOINED GROUPS</h1>
        
        
          <div className="relative w-1/2">
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-[#3a3a3a] rounded-full text-white border-none"
            />
            <div className="absolute left-3 top-2 text-[#888888]">
              🔍
            </div>
          </div>
        </div>

        <div className="container w-full overflow-y-auto pl-6 pr-6 pb-6">
          <div className="mb-8 p-6 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A]">
            <div className="grid-layout grid-cols-1 md:grid-cols-3 gap-4">
              {userGroups.map((group) => (
                <Link
                  href={`/dashboard/groups/${group.id}`} 
                  key={group.id} 
                  className="p-8 bg-[#444444] hover:bg-[#555555] rounded-lg flex items-center justify-center text-center"
                >
                  {group.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}