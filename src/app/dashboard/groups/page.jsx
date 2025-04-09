'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import dummyGroups from '@/data/dummyGroups';
console.log(dummyGroups);

export default function Groups() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategory, setShowCategory] = useState(false);
  const [category, setCategory] = useState("");
  const recommendedGroups = dummyGroups.filter(group => group.categories.includes('recommended'));
  const popularGroups = dummyGroups.filter(group => group.categories.includes('popular'));
  const categories = ['clubs', 'hobbies', 'education'];

  // Redirect employers who shouldn't have access to groups
  if (user?.role === 'employer') {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold mb-4">access restricted</h1>
        <p>employers don't have access to groups.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-grow pr-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">FIND GROUPS</h1>
          
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
        
        {!showCategory ? (
          <>
            {/* Recommended section */}
            <div className="mb-8 p-6 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A]">
              <h2 className="text-xl font-medium mb-4 text-white">RECOMMENDED</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedGroups.map((group) => (
                  <Link
                    href={`/dashboard/groups/${group.id}`} 
                    key={group.id} 
                    className="p-8 bg-[#333333] rounded-lg flex items-center justify-center"
                  >
                    <h3 className="text-lg font-medium text-white text-center">{group.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Browse by category */}
            <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A]">
              <h2 className="text-xl font-medium mb-4 text-white">BROWSE BY CATEGORY</h2>
              
              {/* Clubs section */}
              <div className="mb-6">
                {categories.map((category)=> (
                  <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-white">
                      {category.toUpperCase()}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {dummyGroups.filter(group => group.categories.includes(category)).map((group) => (
                        <Link
                          href={`/dashboard/groups/${group.id}`} 
                          key={group.id} 
                          className="p-8 bg-[#333333] rounded-lg flex items-center justify-center"
                        >
                          <h3 className="text-lg font-medium text-white text-center">{group.name}</h3>
                        </Link>
                      ))}
                    </div>
                    <div className="flex justify-end mt-2">
                      <button className="text-[#4caf9e] hover:text-[#a7ece1] cursor-pointer"
                        onClick={() => {setShowCategory(true);
                          setCategory(category);
                        }}
                          >+ SEE MORE
                      </button> 
                    </div> 
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6 p-6 bg-[#2A2A2A] rounded-lg border border-[#3A3A3A] relative">
            <>
              <h2 className = "text-lg font-medium mb-4 text-white">{category.toUpperCase()}</h2>
              <button
                className="text-(--text-secondary) absolute top-6 right-5 text-sm hover:text-(--text-primary) cursor-pointer"
                onClick={() => setShowCategory(false)}>
                  {"< BACK"}
                </button>  
            </>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {category === 'clubs' && dummyClubGroups.map((group) => (
                <div 
                  key={group.id} 
                  className="p-8 bg-[#333333] rounded-lg flex items-center justify-center"
                >
                  <h3 className="text-lg font-medium text-white text-center">{group.name}</h3>
                </div>
              ))}
              {category === 'hobbies' && dummyHobbyGroups.map((group) => (
                <div 
                  key={group.id} 
                  className="p-8 bg-[#333333] rounded-lg flex items-center justify-center"
                >
                  <h3 className="text-lg font-medium text-white text-center">{group.name}</h3>
                </div>
              ))}
              {category === 'education' && dummyEducationGroups.map((group) => (
                <div key={group.id}
                  className="p-8 bg-[#333333] rounded-lg flex items-center justify-center"
                >
                  <h3 className="text-lg font-medium text-white text-center">{group.name}</h3>
                </div>
              ))}
                
            </div> */}

          </div>

        )}
        
      </div>
      
      {/* Right sidebar */}
      <div className="w-80">
        <div className="bg-[#2A2A2A] p-4 rounded-lg border border-[#3A3A3A] mt-12">
          <h2 className="text-xl font-medium mb-4 text-white">ACTIVITY</h2>
          
          <div>
            <h3 className="font-medium text-white">POPULAR</h3>
            <div className="space-y-4 mt-3">
              {popularGroups.map((group, index) => (
                <div key={group.id}>
                  <div className="pb-2">
                    <h4 className="text-white">{group.name}</h4>
                    {group.newMembers && (
                      <div className="text-sm text-[#888888]">{group.newMembers}</div>
                    )}
                    {group.mostActive && (
                      <div className="text-sm text-[#888888]">{group.mostActive}</div>
                    )}
                  </div>
                  {index < popularGroups.length - 1 && (
                    <div className="border-b border-[#3A3A3A] my-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-b border-[#3A3A3A] my-4"></div>
          
          <div>
            <h2 className="font-medium mb-4 text-white">MY GROUPS</h2>
            <button className="w-full p-3 bg-[#333333] rounded-lg text-white">
              SEE MY JOINED GROUPS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}