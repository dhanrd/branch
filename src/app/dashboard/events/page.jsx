'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Dummy event data
const dummyEvents = [
  {
    id: 1,
    title: 'Event Name',
    organizer: 'ClubRep123',
    date: '2025-04-15',
    time: '10:00 AM - 8:00 PM',
    location: 'ICT 513',
    description: 'Club event description',
  },
  {
    id: 2,
    title: 'Another Event Name',
    organizer: 'ClubRep456',
    date: '2025-04-22',
    time: '9:00 AM - 3:00 PM',
    location: 'MacEwan Student Centre',
    description: 'Club event description',
  },
];

export default function Events() {
  const { user } = useAuth();
  const [events] = useState(dummyEvents);
  const [sortOption, setSortOption] = useState('Relevant');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

// Sort by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top search bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">events</h1>
        
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
      
      {/* New event button */}
      <div className="mb-4">
        {user.role === 'student' && (
          <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-md hover:bg-[#3d9b8d]">
            NEW EVENT
          </button>
        )}
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
      
      {/* Events list */}
      <div className="space-y-4 overflow-y-auto">
        {sortedEvents.map((event) => (
          <div key={event.id} className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-md">
            <div className="flex items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#444444] mr-3"></div>
              <div>
                <h3 className="font-medium text-white">{event.title}</h3>
                <div className="text-sm text-[#888888]">{event.organizer}</div>
              </div>
            </div>
            
            <p className="text-[#e0e0e0] mb-3">{event.description}</p>
            
            <div className="text-sm text-[#a0a0a0] mb-3">
              <div>date: {event.date}</div>
              <div>time: {event.time}</div>
              <div>location: {event.location}</div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-6 py-2 bg-[#4caf9e] text-white rounded-lg">
                REGISTER
              </button>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}