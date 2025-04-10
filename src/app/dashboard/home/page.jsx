'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import CreatePost from '@/components/posts/createPost';


// Dummy post data related to CS/Software Engineering
const dummyPosts = [
  {
    id: 1,
    title: 'Post Title',
    author: 'User123',
    content: 'Body of post.',
    likes: 24,
    comments: 7,
    hasImage: false
  },
  {
    id: 2,
    title: 'Post Title',
    author: 'User456',
    content: 'Image caption.',
    likes: 18,
    comments: 12,
    hasImage: true,
  }
];

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' or 'explore'
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(dummyPosts);
  
  // Redirect employer users since they shouldn't have access to home
  if (user?.role === 'employer') {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold mb-4">access restricted</h1>
        <p>employers don't have access to the home feed.</p>
      </div>
    );
  }

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">home</h1>
        
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
      
      {/* Feed/Explore tabs */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'explore' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('explore')}
          >
            Explore
          </button>
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'feed' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('feed')}
          >
            Feed
          </button>
        </div>
      </div>
      
      {/* New post button */}
      <div className="mb-4">
        <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]" onClick={() => setShowModal(true)}>
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
                onClick={() => handleSortChange('Newest')}
              >
                Newest
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

        {showModal && (
          <CreatePost
            onClose={() => setShowModal(false)}
            onSubmit={handleNewPost}
            author={user?.username}
            groupId={null}
          />
        )}

      
      {/* Post feed */}
      <div className="space-y-4 overflow-y-auto">
        {posts.map(post => (
          <div key={post.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
              <div>
                <h3 className="font-medium text-white">{post.title}</h3>
                <div className="text-sm text-[#888888]">{post.author}</div>
              </div>
            </div>
            
            <div
              className="text-[#e0e0e0] mb-3"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
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
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}