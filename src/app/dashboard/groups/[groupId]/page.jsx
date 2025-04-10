'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import dummyGroups from '@/data/dummyGroups';

// Dummy group posts data to match prototype
const dummyPosts = [
  // Machine Learning Group (groupId: 1)
  {
    id: 1,
    title: "Getting Started with Neural Networks",
    author: "ML_Enthusiast",
    content: "Just completed my first neural network implementation using TensorFlow! The backpropagation concept was tricky but rewarding to understand. Any tips for improving model accuracy?",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likes: 12,
    hasImage: false,
    groupId: 1,
    likedBy: [],
    comments: []
  },
  {
    id: 2,
    title: "Attention Mechanisms Explained",
    author: "NLP_Researcher",
    content: "Created a visual guide explaining how attention works in transformer models. Check out the diagrams showing the self-attention calculations!",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    likes: 24,
    hasImage: true,
    groupId: 1,
    likedBy: [],
    comments: []
  },

  // Computer Science Undergraduate Society (groupId: 2)
  {
    id: 3,
    title: "Welcome New Members!",
    author: "ClubPresident",
    content: "Welcome to all 6 new members who joined yesterday! Our first meetup is this Friday at 4pm in the CS lounge. Pizza will be provided!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 18,
    hasImage: false,
    groupId: 2,
    likedBy: [],
    comments: []
  },
  {
    id: 4,
    title: "Midterm Study Session",
    author: "AcademicChair",
    content: "Organizing a group study session for upcoming midterms. We'll cover Data Structures and Algorithms. Who's interested?",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 22,
    hasImage: false,
    groupId: 2,
    likedBy: [],
    comments: []
  },

  // Web Development (groupId: 3)
  {
    id: 5,
    title: "React vs Vue in 2023",
    author: "FrontendDev",
    content: "Which framework are you using for new projects? I'm particularly interested in performance comparisons for large-scale applications.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 15,
    hasImage: false,
    groupId: 3,
    likedBy: [],
    comments: []
  },
  {
    id: 6,
    title: "CSS Grid Layout Tips",
    author: "CSS_Wizard",
    content: "After working with CSS Grid for several projects, here are my top 10 tips for creating responsive layouts efficiently.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 28,
    hasImage: true,
    groupId: 3,
    likedBy: [],
    comments: []
  },

  // Study Tips (groupId: 6)
  {
    id: 7,
    title: "Pomodoro Technique Works!",
    author: "StudySmart",
    content: "After trying Pomodoro for a month, my productivity has doubled. 25-minute focused sessions with 5-minute breaks are game-changing!",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 19,
    hasImage: false,
    groupId: 6,
    likedBy: [],
    comments: []
  },
  {
    id: 8,
    title: "Best Note-Taking Apps",
    author: "NoteTaker",
    content: "Comparing Notion, OneNote, and Obsidian for CS students. Each has strengths for different study styles - which do you prefer?",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 25,
    hasImage: false,
    groupId: 6,
    likedBy: [],
    comments: []
  },

  // Learning C++ (groupId: 15)
  {
    id: 9,
    title: "C++20 Features Overview",
    author: "CPP_Expert",
    content: "Just explored the new C++20 features. Modules and concepts are game changers! Here's a quick example of how concepts improve template code.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 14,
    hasImage: false,
    groupId: 15,
    likedBy: [],
    comments: []
  },
  {
    id: 10,
    title: "Memory Management Tips",
    author: "SystemProgrammer",
    content: "Sharing some hard-earned lessons about smart pointers and memory leaks. Unique_ptr vs shared_ptr - when to use each?",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 17,
    hasImage: true,
    groupId: 15,
    likedBy: [],
    comments: []
  },

  // Women in Computer Science (groupId: 4)
  {
    id: 11,
    title: "Guest Speaker Next Week",
    author: "EventCoordinator",
    content: "We have a senior engineer from Google coming to speak about her career journey in tech. RSVP required - limited seats available!",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 12,
    hasImage: false,
    groupId: 4,
    likedBy: [],
    comments: []
  },
  {
    id: 12,
    title: "Mentorship Program",
    author: "MentorshipChair",
    content: "Applications for our winter mentorship program are now open! Pair with an experienced professional in your field of interest.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 15,
    hasImage: false,
    groupId: 4,
    likedBy: [],
    comments: []
  },

  // Calgary Esports United (groupId: 14)
  {
    id: 13,
    title: "Tournament Results",
    author: "EventManager",
    content: "Congratulations to team Phoenix for winning our Valorant tournament! Final score was 13-11 in an intense overtime match.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likes: 32,
    hasImage: true,
    groupId: 14,
    likedBy: [],
    comments: []
  },
  {
    id: 14,
    title: "New Game Nights",
    author: "SocialChair",
    content: "Starting weekly Rocket League nights every Thursday. All skill levels welcome! Bring your own controller.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 24,
    hasImage: false,
    groupId: 14,
    likedBy: [],
    comments: []
  },

  // Competitive Programming Club (groupId: 5)
  {
    id: 15,
    title: "Upcoming Contest",
    author: "ContestOrganizer",
    content: "Monthly programming contest this Saturday. Prizes for top 3! Problems will focus on dynamic programming and graph algorithms.",
    timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
    likes: 18,
    hasImage: false,
    groupId: 5,
    likedBy: [],
    comments: []
  },
  {
    id: 16,
    title: "Dynamic Programming Workshop",
    author: "AlgoExpert",
    content: "Recording of last week's DP workshop is now available. Covers knapsack problems, LCS, and memoization techniques.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 21,
    hasImage: false,
    groupId: 5,
    likedBy: [],
    comments: []
  },

  // Music (groupId: 7)
  {
    id: 17,
    title: "Band Looking for Drummer",
    author: "Guitarist123",
    content: "Our indie rock band needs a drummer for weekly practices. Influences include Arctic Monkeys and The Strokes. DM if interested!",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 8,
    hasImage: false,
    groupId: 7,
    likedBy: [],
    comments: []
  },
  {
    id: 18,
    title: "Best Headphones for Mixing",
    author: "AudioEngineer",
    content: "Looking for recommendations under $200. Currently considering Audio-Technica ATH-M50x but open to suggestions.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 12,
    hasImage: false,
    groupId: 7,
    likedBy: [],
    comments: []
  },

  // Hockey (groupId: 8)
  {
    id: 19,
    title: "Pickup Game This Weekend",
    author: "HockeyFanatic",
    content: "Organizing a casual game at the Olympic Oval on Saturday. All skill levels welcome! Bring your own gear.",
    timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000), // 9 hours ago
    likes: 14,
    hasImage: false,
    groupId: 8,
    likedBy: [],
    comments: []
  },
  {
    id: 20,
    title: "Flames Game Watch Party",
    author: "PuckHead",
    content: "Anyone want to meet up at the Den for Saturday's game against Edmonton? First round is on me if we win!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 10,
    hasImage: false,
    groupId: 8,
    likedBy: [],
    comments: []
  },

  // Baking (groupId: 9)
  {
    id: 21,
    title: "Sourdough Starter Help",
    author: "BreadLover",
    content: "My starter isn't bubbling after 5 days. I'm feeding it daily with equal parts flour and water. What am I doing wrong?",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 7,
    hasImage: true,
    groupId: 9,
    likedBy: [],
    comments: []
  },
  {
    id: 22,
    title: "Best Chocolate Chip Cookie Recipe",
    author: "CookieMonster",
    content: "After 20 attempts, I've perfected my recipe. Secret is browning the butter and using a mix of chocolate types!",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 19,
    hasImage: true,
    groupId: 9,
    likedBy: [],
    comments: []
  },

  // Resume Help (groupId: 10)
  {
    id: 23,
    title: "ATS-Friendly Resume Tips",
    author: "CareerAdvisor",
    content: "How to format your resume to pass through Applicant Tracking Systems. Avoid columns and fancy formatting!",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 22,
    hasImage: false,
    groupId: 10,
    likedBy: [],
    comments: []
  },
  {
    id: 24,
    title: "Resume Review Volunteers Needed",
    author: "CommunityMod",
    content: "We need experienced members to help review resumes for newcomers. Especially needed are people with tech industry experience.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 15,
    hasImage: false,
    groupId: 10,
    likedBy: [],
    comments: []
  },

  // 355 Study Group (groupId: 11)
  {
    id: 25,
    title: "Assignment 3 Solutions",
    author: "TopOfClass",
    content: "Sharing my solutions for the latest assignment. Let me know if you spot any errors or have better approaches!",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    likes: 13,
    hasImage: false,
    groupId: 11,
    likedBy: [],
    comments: []
  },
  {
    id: 26,
    title: "Midterm Study Guide",
    author: "StudyGroupLeader",
    content: "Compiled a list of key topics to focus on for next week's exam. Includes practice problems from past years.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 18,
    hasImage: false,
    groupId: 11,
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
  const [replyingTo, setReplyingTo] = useState(null);
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

  const params = useParams();
  const groupId = params?.groupId ? parseInt(params.groupId) : null;
  
  if (user?.role === 'employer') {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold mb-4">access restricted</h1>
        <p>employers don't have access to groups.</p>
      </div>
    );
  }

  useEffect(() => {
    if (groupId && groups.length > 0) {
      const group = groups.find(g => g.id === groupId) || dummyGroups.find(g => g.id === groupId);
      if (group) {
        setGroupInfo(group);
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
    setReplyingTo(null);
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
    setReplyingTo(comment);
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
    return filtered;
  };

  const handleLikeComment = (postId, commentId) => {
    setAllPosts(
      allPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: updateCommentLikes(p.comments, commentId)
          };
        }
        return p;
      })
    );
  };

  // Helper function to recursively update comment likes
  const updateCommentLikes = (comments, commentId) => {
    return comments.map(comment => {
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
      
      if (comment.replies) {
        return {
          ...comment,
          replies: updateCommentLikes(comment.replies, commentId)
        };
      }
      
      return comment;
    });
  };

  const handleAddComment = (postId) => {
    const newComment = {
      id: Date.now(),
      author: user.username,
      content: newCommentText,
      likes: 0,
      likedBy: [],
      timestamp: new Date(),
      replies: []
    };

    setAllPosts(allPosts.map(p => {
      if (p.id === postId) {
        if (replyingTo) {
          // This is a reply to an existing comment
          return {
            ...p,
            comments: addReplyToComment(p.comments, replyingTo.id, newComment)
          };
        } else {
          // This is a top-level comment
          return {
            ...p,
            comments: p.comments ? [...p.comments, newComment] : [newComment]
          };
        }
      }
      return p;
    }));
    
    setNewCommentText('');
    setReplyingTo(null);
  };

  // Helper function to recursively add replies to comments
  const addReplyToComment = (comments, parentId, newReply) => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      
      if (comment.replies) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentId, newReply)
        };
      }
      
      return comment;
    });
  };

  // Recursive component to render comments with replies
  const Comment = ({ comment, depth = 0 }) => {
    const maxDepth = 8; // Maximum indentation depth to prevent UI issues
    const indent = Math.min(depth, maxDepth);
    
    return (
      <div 
        className={`flex items-start space-x-4 mb-4 pb-2 ${depth > 0 ? 'border-l-2 border-gray-700 pl-4' : ''}`}
        style={{ marginLeft: `${indent * 12}px` }}
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="flex-grow">
          <p className="text-sm text-white mb-1">
            <strong>{comment.author}</strong>
          </p>
          <p className="text-gray-300 mb-2">{comment.content}</p>
          <div className="flex items-center space-x-2">
            <button 
              className="flex items-center text-xs text-[#888888]"
              onClick={(e) => { e.stopPropagation(); handleLikeComment(selectedPost.id, comment.id); }}
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
            <button 
              className="text-xs text-gray-400"
              onClick={() => handleReply(comment)}
            >
              Reply
            </button>
          </div>
          
          {/* Render replies if they exist */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map(reply => (
                <Comment 
                  key={reply.id} 
                  comment={reply} 
                  depth={depth + 1} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!groupInfo) {
    return <div className="text-white">loading group information...</div>;
  }

  const joined = userGroups.some(group => group.id === groupInfo.id);
  const inviteLink = groupInfo ? `${window.location.origin}/invite?groupId=${groupInfo.id}` : '';

  return (
    <div className="flex flex-col h-screen overflow-y-hidden">
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="mt-2 mb-4 bg-[#2a2a2a] text-white rounded shadow-md w-40 border border-[#444]">
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
      <div className="flex-1 overflow-y-auto px-4">
        { joined && (
          <div className="mb-4">
            <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]">
              + New Post
            </button>
          </div>
        )}

        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-md bg-[#1e1e1e] overflow-hidden">
              <div className="bg-[#2d2d2d] p-4 flex justify-between items-center">
                <h2 className="text-white text-lg font-bold">Invite to Group</h2>
                <button
                  className="text-white bg-[#444] rounded px-2 py-1"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="p-4">
                <p className="text-white mb-2">Share this invite link with your friends:</p>
                <div className="bg-gray-800 text-white px-3 py-2 rounded flex justify-between items-center">
                  <span className="text-sm break-all">{inviteLink}</span>
                  <button
                    className="ml-2 text-sm text-[#4caf9e]"
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink);
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
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
          
          {activeTab === 'resources' && getSortedPosts().map(post => (
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
                    <p className="mt-2 text-white">{selectedPost.content}</p>
                  </div>
                </div>

                <div className="flex items-center text-[#888888] space-x-4">
                  <span>{formatTimestamp(new Date(selectedPost.timestamp))}</span>
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
                    <Comment 
                      key={comment.id} 
                      comment={comment} 
                      depth={0} 
                    />
                  ))}
                </div>

                {/* Add New Comment Section */}
                <div className="mt-4 border-t border-gray-700 pt-4 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="flex-grow ml-4">
                    {replyingTo && (
                      <div className="mb-2 text-sm text-gray-400">
                        Replying to @{replyingTo.author}
                        <button 
                          className="ml-2 text-xs text-gray-500"
                          onClick={() => setReplyingTo(null)}
                        >
                          (cancel)
                        </button>
                      </div>
                    )}
                    <textarea
                      className="w-full p-2 bg-[#2d2d2d] text-white border border-gray-600 rounded"
                      rows="2"
                      placeholder={replyingTo ? `Reply to @${replyingTo.author}...` : "Write your comment..."}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                    />
                  </div>
                  <div className="ml-4">
                    <button
                      className="px-4 py-2 bg-[#4caf9e] text-white rounded hover:bg-[#3d9b8d]"
                      onClick={() => handleAddComment(selectedPost.id)}
                      disabled={!newCommentText.trim()}
                    >
                      {replyingTo ? 'Post Reply' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}