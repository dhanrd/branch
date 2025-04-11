'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// Dummy group posts data to match prototype
const dummyPosts = [
  {
    id: 1,
    title: "Post Title",
    author: "User123",
    content: "Something about machine learning.",
    timestamp: '3 hours ago',
    likes: 12,
    comments: 7,
    hasImage: false
  },
  {
    id: 2,
    title: "Post Title",
    author: "User456",
    content: "Something about machine learning.",
    timestamp: '1 day ago',
    likes: 24,
    comments: 0,
    hasImage: true
  }
];

export default function GroupDetail() {
  const { user, groups } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [groupInfo, setGroupInfo] = useState(null);
  const [posts] = useState(dummyPosts);
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Use useParams hook instead of accessing params directly
  const params = useParams();
  const groupId = params?.groupId ? parseInt(params.groupId) : null;
  
  // Redirect employers who shouldn't have access to groups
  if (user?.role === 'employer') {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold mb-4">access restricted</h1>
        <p>employers don't have access to groups.</p>
      </div>
    );
  }

  // Get group info from the groups context
  useEffect(() => {
    if (groupId) {
      // In a real app, this would be an API call or context fetch
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setGroupInfo(group);
      }
    }
  }, [groupId, groups]);

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  if (!groupInfo) {
    return <div className="text-white">loading group information...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top search bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white uppercase">{groupInfo.name}</h1>
        </div>
        
        <div className="relative w-1/2">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full px-4 py-2 pl-10 bg-[#3a3a3a] rounded-full text-white border-none"
          />
          <div className="absolute left-3 top-2 text-[#888888]">
            🔍
          </div>
        </div>
      </div>
      
      <div className="flex mb-6">
        <div className="w-16 h-16 rounded-full bg-[#444444] flex items-center justify-center mr-4 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white">
            <path 
              d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-0.29 0-0.62 0.02-0.97 0.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Group info and buttons */}
        <div>
          <p className="text-[#a0a0a0] mb-2">{groupInfo.description}</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]">
              JOIN GROUP
            </button>
            <button className="px-4 py-2 bg-[#333333] text-white rounded-md">
              INVITE
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'posts' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'resources' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>
      </div>
      
      {/* New post button */}
      <div className="mb-4">
        <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]">
          + New Post
        </button>
      </div>
      
      {/* Sort options */}
      <div className="flex justify-end mb-2 relative">
        <button 
          className="flex items-center text-[#a0a0a0]"
          onClick={toggleSortDropdown}
        >
          {sortOption} <span className="ml-1">▼</span>
        </button>
        
        {showSortDropdown && (
          <div className="absolute top-8 right-0 bg-[#333333] border border-[#444444] rounded shadow-lg z-10">
            <div className="py-1">
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleSortChange('Relevant')}
              >
                Relevant
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleSortChange('Recent')}
              >
                Recent
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleSortChange('Top')}
              >
                Top
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Post feed */}
      <div className="space-y-4 overflow-y-auto">
        {activeTab === 'posts' && posts.map(post => (
          <div key={post.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
              <div>
                <h3 className="font-medium text-white">{post.title}</h3>
                <div className="text-sm text-[#888888]">{post.author} in {groupInfo.name}</div>
              </div>
            </div>
            
            <p className="text-[#e0e0e0] mb-3">{post.content}</p>
            
            {post.hasImage && (
              <div className="mb-3">
                <div className="w-full h-48 bg-[#333333] flex items-center justify-center mb-1">
                  <svg className="w-10 h-10 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-4 text-[#888888]">
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {post.comments}
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'resources' && (
          <div className="text-center py-8 text-[#a0a0a0]">
            no resources available yet.
          </div>
        )}
      </div>
    </div>
  );
}