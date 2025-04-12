'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import dummyGroups from '@/data/dummyGroups';
import CreatePost from '@/components/posts/createPost';


// Dummy group posts data to match prototype
const dummyPosts = [
  {
    id: 1,
    title: "Post Title",
    author: "User123",
    content: "Something about machine learning.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 12,
    hasImage: false,
    groupId: 1,
    likedBy: [],
    comments: []
  },
  {
    id: 2,
    title: "Post Title",
    author: "User456",
    content: "Something about machine learning.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 24,
    hasImage: true,
    groupId: 1,
    likedBy: [],
    comments: []
  }
];

export default function GroupDetail() {
  const { user, groups, userGroups, joinGroup, leaveGroup } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [groupInfo, setGroupInfo] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showLeaveMenu, setShowLeaveMenu] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [allPosts, setAllPosts] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('allPosts');
      if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        const fixed = parsed.map(post => ({
          ...post,
          comments: Array.isArray(post.comments) ? post.comments : []
        }));
        return fixed.length > 0 ? fixed : dummyPosts.map(post => ({ ...post, type: 'posts' }));
      }
    }
    return dummyPosts.map(post => ({ ...post, type: 'posts' }));
  });

  
  const [posts, setPosts] = useState(dummyPosts);
  const [showModal, setShowModal] = useState(false);
  const [isEvent, setIsEvent] = useState(false);

  
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
    if (groupId && groups.length > 0) {
      const group = groups.find(g => g.id === groupId) || dummyGroups.find(g => g.id === groupId);
      if (group) {
        setGroupInfo(group);
        console.log("groupInfo.id:", group.id);
      }
    }
  }, [groupId, groups]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAllPosts([...allPosts]); 
    }, 60000);
    
    return () => clearInterval(interval);
  }, [allPosts]);
  
  
  useEffect(() => {
    localStorage.setItem('allPosts', JSON.stringify(allPosts));
  }, [allPosts]);
  
  
  useEffect(() => {
    if (selectedPost) {
      const updatedPost = allPosts.find(p => p.id === selectedPost.id);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      }
    }
  }, [allPosts, selectedPost]);
  

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleOpenPostModal = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };
  
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  const handleJoinGroup = async () => {
    joinGroup(groupInfo.id);
  };

  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };
  
  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };
  

  const handleReply = (comment) => {
    setNewCommentText(`@${comment.author} `);

  };
  

  const handleLike = (postId) => {
    setAllPosts(
      allPosts.map(post => {
        if (post.id === postId) {
          const likedBy = post.likedBy || [];
          if (likedBy.includes(user.id)) {
            return {
              ...post,
              likes: post.likes - 1,
              likedBy: likedBy.filter(id => id !== user.id)
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              likedBy: [...likedBy, user.id]
            };
          }
        }
        return post;
      })
    );
  };
  

  function formatTimestamp(timestamp) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

  const getSortedPosts = () => {
    let filtered = allPosts.filter(
      post => post.type === activeTab && post.groupId === Number(groupInfo.id) 
    );

    


    
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  

    if (sortOption === 'Recent') {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortOption === 'Top') {
      filtered.sort((a, b) => b.likes - a.likes);
    }
    // No need to implement relevancy
    return filtered;
  };
  

  const handleLikeComment = (postId, commentId) => {
    setAllPosts(
      allPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.map(comment => {
              if (comment.id === commentId) {
                if (!comment.likedBy.includes(user.id)) {
                  return {
                    ...comment,
                    likes: comment.likes + 1,
                    likedBy: [...comment.likedBy, user.id]
                  };
                } else {
                  return {
                    ...comment,
                    likes: comment.likes - 1,
                    likedBy: comment.likedBy.filter(id => id !== user.id)
                  };
                }
              }
              return comment;
            })
          };
        }
        return p;
      })
    );
  };


  const handleAddComment = (postId) => {
    const newComment = {
      id: Date.now(), 
      author: user.username,
      content: newCommentText,
      likes: 0,
      likedBy: [] 
    };
  
    setAllPosts(allPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: p.comments ? [...p.comments, newComment] : [newComment]
        };
      }
      return p;
    }));
    
    setNewCommentText('');
  };
  

  const handleNewPost = (post) => {
    setAllPosts(prev => [
      { ...post, groupId: groupInfo.id, type: 'posts' }, 
      ...prev
    ]);
  };

  if (!groupInfo) {
    return <div className="text-white">loading group information...</div>;
  }

  const joined = userGroups.some(group => group.id === groupInfo.id);
  const inviteLink = groupInfo ? `${window.location.origin}/invite?groupId=${groupInfo.id}` : '';

  const isAdmin = groupInfo.admin === user?.id;

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
      {/* Top search bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-[#444444] flex items-center justify-center mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-white">
              <path 
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-0.29 0-0.62 0.02-0.97 0.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" 
                fill="currentColor"
              />
            </svg>
          </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white uppercase">{groupInfo.name}</h1>
        </div>
        
        <div className="relative w-1/2">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full px-4 py-2 pl-10 bg-[#3a3a3a] rounded-full text-white border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2 text-[#888888]">
            🔍
          </div>
        </div>
      </div>
      
      {isAdmin && (
        <h3 className="text-white uppercase mb-3 ml-1 font-bold">Admin</h3>
      )}
      
      <div className="flex mb-6">
         
        {/* Group info and buttons */}
        <div>
          <p className="text-[#a0a0a0] mb-2">{groupInfo.description}</p>
          <div className="flex items-center gap-2">
            <button className={`px-4 py-2 rounded-md text-white ${joined ? 'bg-[#888888]' : 'bg-[#4caf9e] hover:bg-[#3d9b8d]'}`}
              onClick={() => { if (joined) { setShowLeaveMenu(prev => !prev);} else {handleJoinGroup();}}}
              >
              {joined ? 'JOINED' : 'JOIN GROUP'}
            </button>
            <button className="px-4 py-2 bg-[#333333] text-white rounded-md" onClick={handleOpenInviteModal}>
              INVITE
            </button>
          </div>
        </div>

      </div>
      

      
        {joined && showLeaveMenu && (
            <div className="mt-2 mb-4 ml-2 bg-[#2a2a2a] text-white rounded shadow-md w-40 border border-[#444]">
              <button
                onClick={() => {
                  leaveGroup(groupInfo.id);
                  setShowLeaveMenu(false);
                }}
                className="w-full px-4 py-2 hover:bg-[#3a3a3a] text-left"
              >
                Leave Group
              </button>
              <button
                onClick={() => setShowLeaveMenu(false)}
                className="w-full px-4 py-2 hover:bg-[#3a3a3a] text-left"
              >
                Cancel
              </button>
            </div>
          )}

          {/* New post button */}
      <div className="flex space-x-2 ">
        <div className="flex items-center space-x-2  mb-4">
        { joined && (
        <div className="mb-4">
          <button className="px-3 py-2  bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]" 
          onClick={() => {
            setIsEvent(false);
            setShowModal(true);
          }}
          >
            + New Post
          </button>
        </div>
        )}

        {/* Add event button */}
        { joined && isAdmin && (
        <div className="mb-4">
          <button className="px-3 py-2  bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]"
          onClick={() => 
          { setIsEvent(true);
            setShowModal(true);
          }}
          >
            + Add Event
          </button>
        </div>
        )}
      </div>
     </div> 

      {/* Tabs */}
      <div className="mb-1">
        <div className="flex space-x-2">
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'posts' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'events' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`px-6 py-2 rounded-md ${activeTab === 'resources' ? 'bg-[#3a3a3a] text-white' : 'bg-[#2d2d2d] text-[#888888]'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>
      
      
     </div>
      

  
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-md bg-[#1e1e1e] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#2d2d2d] p-4 flex justify-between items-center">
              <h2 className="text-white text-lg font-bold">Invite to Group</h2>
              <button
                className="text-white bg-[#444] rounded px-2 py-1"
                onClick={() => setIsInviteModalOpen(false)}
              >
                Close
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-4">
              <p className="text-white mb-2">Share this invite link with your friends:</p>
              <div className="bg-gray-800 text-white px-3 py-2 rounded flex justify-between items-center">
                <span className="text-sm break-all">{inviteLink}</span>
                <button
                  className="ml-2 text-sm text-[#4caf9e]"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    // Optionally show a notification here.
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showModal && (
        <CreatePost
          onClose={() => setShowModal(false)}
          onSubmit={handleNewPost}
          author={user?.username}
          hideGroupSelector={true}
          groupId={groupInfo.id}
          isEvent={isEvent}
        />
      )}
      
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
        <div className="space-y-4 overflow-y-auto pb-10">
          {activeTab === 'posts' && getSortedPosts().map(post => (
            <div key={post.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md cursor-pointer" onClick={() => handleOpenPostModal(post)}>
          <div className="flex items-start mb-3">
            <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
            <div>
              <h3 className="font-medium text-white">{post.title}</h3>
              <div className="text-sm text-[#888888]">
              {post.author} in {groupInfo.name} &bull; {formatTimestamp(new Date(post.timestamp))}</div>
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
            <button className="flex items-center" onClick={(e) => {e.stopPropagation(); handleLike(post.id)}}> 
                <svg className={`w-5 h-5 mr-1 ${post.likedBy && post.likedBy.includes(user.id) ? 'text-red-500' : 'text-white'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {post.comments.length}
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'events' && getSortedPosts().map(post => (
          <div key={post.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md cursor-pointer" onClick={() => handleOpenPostModal(post)}>
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
              <div>
                <h3 className="font-medium text-white">{post.title}</h3>
                <div className="text-sm text-[#888888]">
                {post.author} in {groupInfo.name} &bull; {formatTimestamp(new Date(post.timestamp))}</div>
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
              <button className="flex items-center" onClick={(e) => {e.stopPropagation(); handleLike(post.id)}}> 
                <svg className={`w-5 h-5 mr-1 ${post.likedBy && post.likedBy.includes(user.id) ? 'text-red-500' : 'text-white'}`} 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {post.comments.length}
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'resources' && getSortedPosts().map(post =>  (
          <div key={post.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md cursor-pointer" onClick={() => handleOpenPostModal(post)}>
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
              <div>
                <h3 className="font-medium text-white">{post.title}</h3>
                <div className="text-sm text-[#888888]">
                  {post.author} in {groupInfo.name} &bull; {formatTimestamp(new Date(post.timestamp))}
                </div>
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
                <svg className={`w-5 h-5 mr-1 ${post.likedBy && post.likedBy.includes(user.id) ? 'text-red-500' : 'text-white'}`}  
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                {post.likes}
              </button>
              <button className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {post.comments.length}
              </button>
            </div>
          </div>
        ))}
      </div>
        {isPostModalOpen && selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-md bg-[#1e1e1e] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#2d2d2d] p-4 flex justify-between items-center">
                <h2 className="text-white text-lg font-bold">{selectedPost.title}</h2>
                <button 
                  className="text-white bg-[#444] rounded px-2 py-1"
                  onClick={() => setIsPostModalOpen(false)}
                >
                  Close
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 space-y-6">
                {/* Post Content & Stats */}
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-[#888888]">
                      <strong>{selectedPost.author}</strong>
                    </p>
                    {/* Post content with a top margin */}
                    <p className="mt-2 text-white">{selectedPost.content}</p>
                  </div>
                </div>

                <div className="flex items-center text-[#888888] space-x-4">
                  <span>{formatTimestamp(new Date(selectedPost.timestamp))}</span>
                  {/* New clickable heart icon for post likes */}
                  <button 
                    className="flex items-center"
                    onClick={() => handleLike(selectedPost.id)}
                  >
                    <svg 
                      className={`w-5 h-5 mr-1 ${selectedPost.likedBy && selectedPost.likedBy.includes(user.id) ? 'text-red-500' : 'text-white'}`}
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span>{selectedPost.likes}</span>
                  </button>
                  <span>{selectedPost.comments?.length || 0} comments</span>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-4">Comments</h3>
                  {selectedPost.comments && selectedPost.comments.map(comment => (
                    <div
                      key={comment.id}
                      className="flex items-start space-x-4 mb-4 border-b border-gray-700 pb-2"
                    >
                      {/* Comment Avatar (blank circle) */}
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                      {/* Comment Content Container */}
                      <div className="ml-4 flex-grow">
                        <p className="text-sm text-white mb-1">
                          <strong>{comment.author}</strong>
                        </p>
                        <p className="text-gray-300 mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-2">
                          {/* Like button for comment */}
                          <button 
                            className="flex items-center text-xs text-[#888888]"
                            onClick={(e) =>{e.stopPropagation(); handleLikeComment(selectedPost.id, comment.id)}}
                          >
                            <svg 
                              className={`w-4 h-4 mr-1 ${comment.likedBy && comment.likedBy.includes(user.id) ? 'text-red-500' : 'text-white'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                            {comment.likes || 0}
                          </button>
                          {/* Reply button next to like button */}
                          <button 
                            className="text-xs text-gray-400"
                            onClick={() => handleReply(comment)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Comment Section */}
                <div className="mt-4 border-t border-gray-700 pt-4 flex items-start">
                  {/* New Comment Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="flex-grow ml-4">
                    <textarea
                      className="w-full p-2 bg-[#2d2d2d] text-white border border-gray-600 rounded"
                      rows="2"
                      placeholder="Write your comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                  </div>
                  {/* Post Reply button on the far right */}
                  <div className="ml-4">
                    <button
                      className="px-4 py-2 bg-[#4caf9e] text-white rounded hover:bg-[#3d9b8d]"
                      onClick={() => handleAddComment(selectedPost.id)}
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}