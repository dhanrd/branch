'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  
  if (!user) return null;

  // Empty stats
  const stats = {
    followers: 0,
    following: 0,
    groups: 0,
    posts: 0
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <div className="flex items-start gap-4 mb-3">
              {/* Profile pic */}
              <div className="w-24 h-24 rounded-full bg-[#444444]"></div>
              
              {/* Name and username */}
              <div className="mt-2">
                <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
                <div className="text-[#a0a0a0]">@{user.username.toLowerCase().replace(/\s+/g, '')}</div>
              </div>
            </div>
            
            {/* Edit profile button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-[#333333] text-white rounded-md hover:bg-[#444444] w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              EDIT PROFILE
            </button>
          </div>
          
          {/* Stats */}
          <div className="col-span-7 flex items-start justify-start gap-6 -ml-40">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.followers}</div>
              <div className="text-[#a0a0a0] uppercase text-sm">FOLLOWERS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.following}</div>
              <div className="text-[#a0a0a0] uppercase text-sm">FOLLOWING</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.groups}</div>
              <div className="text-[#a0a0a0] uppercase text-sm">GROUPS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.posts}</div>
              <div className="text-[#a0a0a0] uppercase text-sm">POSTS</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Me Section */}
      <div className="bg-[#2d2d2d] rounded-lg p-6 mb-8 border border-[#3a3a3a]">
        <h2 className="text-lg uppercase font-medium text-[#a0a0a0] mb-4">ABOUT ME</h2>
        <p className="text-white mb-4">
          Hello this is my bio.
        </p>
        <p className="text-white">
          I am a computer science student at the University of Calgary.
        </p>
        
        {/* Links section */}
        <div className="mt-6">
          <h3 className="text-lg uppercase font-medium text-[#a0a0a0] mb-3">LINKS</h3>
          <div className="flex gap-4">
            <a href="#" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Posts section */}
      <div>
        <h2 className="text-lg uppercase font-medium text-white mb-4">POSTS</h2>
        <div className="text-center py-8 text-[#a0a0a0] bg-[#2d2d2d] rounded-lg border border-[#3a3a3a]">
          you haven't posted anything yet.
        </div>
      </div>
    </div>
  );
}