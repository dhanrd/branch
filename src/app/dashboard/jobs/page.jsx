'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Dummy job listing data
const dummyJobs = [
  {
    id: 1,
    title: 'Intern Developer Position',
    company: 'BigCompany',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Looking for passionate intern developers to join our team for the summer.',
    requirements: 'Knowledge of JavaScript, React, and Node.js.',
    posted: '2 days ago',
    deadline: '2025-04-30',
  },
  {
    id: 2,
    title: 'Intern Software Position',
    company: 'BigCompany',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Join our software team to work on exciting new projects.',
    requirements: 'Experience with Java and database management.',
    posted: '3 days ago',
    deadline: '2025-05-15',
  },
  {
    id: 3,
    title: 'Intern Designer Position',
    company: 'BigCompany',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Design creative user interfaces for our products.',
    requirements: 'Proficiency in UI/UX design principles and tools.',
    posted: '1 week ago',
    deadline: '2025-04-22',
  }
];

export default function Jobs() {
  const { user } = useAuth();
  const [jobs] = useState(dummyJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterOption, setFilterOption] = useState('Relevant');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // New state for saved and applied jobs
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  // New state for showing our modals
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showSavedJobsModal, setShowSavedJobsModal] = useState(false);
  const [showAppliedJobsModal, setShowAppliedJobsModal] = useState(false);

  // Show all jobs
  const filteredJobs = jobs;

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
    setShowFilterDropdown(false);
  };

  // Function to close the modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setSelectedJob(null);
      setShowApplyConfirm(false);
      setShowSaveNotification(false);
    }
  };
  
  // Function to handle apply button click
  const handleApply = () => {
    setShowApplyConfirm(true);
  };
  
  // Function to confirm application
  const confirmApply = () => {
    // Check if job is already in applied jobs
    if (!appliedJobs.some(job => job.id === selectedJob.id)) {
      setAppliedJobs([...appliedJobs, selectedJob]);
    }
    setShowApplyConfirm(false);
  };
  
  // Function to handle save button click
  const handleSave = () => {
    // Check if job is already saved
    if (!savedJobs.some(job => job.id === selectedJob.id)) {
      setSavedJobs([...savedJobs, selectedJob]);
      setShowSaveNotification(true);
      
      // Auto-hide notification after 2 seconds
      setTimeout(() => {
        setShowSaveNotification(false);
      }, 2000);
    }
  };
  
  // Function to remove job from saved list
  const removeSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };
  
  // Function to view job details from saved/applied lists
  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setShowSavedJobsModal(false);
    setShowAppliedJobsModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">job board</h1>
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
        
        {user.role === 'employer' && (
          <button className="px-4 py-2 bg-[#4caf9e] text-white rounded-lg">
            New Job Posting
          </button>
        )}
      </div>
      
      {/* Sort/filter options */}
      <div className="flex justify-end mb-4 relative">
        <button 
          className="flex items-center text-[#a0a0a0]"
          onClick={toggleFilterDropdown}
        >
          {filterOption} <span className="ml-1">▼</span>
        </button>
        
        {showFilterDropdown && (
          <div className="absolute top-8 right-0 bg-[#333333] border border-[#444444] rounded shadow-lg z-10">
            <div className="py-1">
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleFilterChange('Relevant')}
              >
                Relevant
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleFilterChange('Recent')}
              >
                Recent
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#444444]"
                onClick={() => handleFilterChange('Top')}
              >
                Top
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-2">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className={`p-3 border rounded-lg cursor-pointer hover:bg-[#333333] ${
                  selectedJob?.id === job.id ? 'border-[#4caf9e] bg-[#333333]' : 'bg-[#2d2d2d] border-[#3a3a3a]'
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <h3 className="font-medium text-white">{job.title}</h3>
                <div className="text-sm text-[#a0a0a0]">{job.company}</div>
                <div className="text-sm text-[#a0a0a0]">{job.location} • {job.type}</div>
                <div className="text-xs text-[#888888] mt-1">Posted {job.posted}</div>
              </div>
            ))}
            
            {filteredJobs.length === 0 && (
              <div className="text-center py-8 text-[#a0a0a0]">
                No jobs found. Try adjusting your search.
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="p-4 bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg">
            <button 
              className="flex items-center mb-4 w-full hover:bg-[#333333] p-2 rounded transition-colors"
              onClick={() => setShowSavedJobsModal(true)}
            >
              <svg className="w-6 h-6 text-[#888888] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <span className="text-[#888888]">Saved Jobs</span>
              {savedJobs.length > 0 && (
                <span className="ml-auto bg-[#4caf9e] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {savedJobs.length}
                </span>
              )}
            </button>
            
            <button 
              className="flex items-center w-full hover:bg-[#333333] p-2 rounded transition-colors"
              onClick={() => setShowAppliedJobsModal(true)}
            >
              <svg className="w-6 h-6 text-[#888888] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span className="text-[#888888]">Applied</span>
              {appliedJobs.length > 0 && (
                <span className="ml-auto bg-[#4caf9e] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {appliedJobs.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Job details modal */}
      {selectedJob && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">{selectedJob.title}</h2>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-[#888888] hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <div className="text-lg text-[#e0e0e0]">{selectedJob.company}</div>
              <div className="text-[#a0a0a0]">{selectedJob.location} • {selectedJob.type}</div>
            </div>
            
            <div className="mb-6">
              <div><span className="font-medium text-[#e0e0e0]">Posted:</span> <span className="text-[#a0a0a0]">{selectedJob.posted}</span></div>
              <div><span className="font-medium text-[#e0e0e0]">Application Deadline:</span> <span className="text-[#a0a0a0]">{selectedJob.deadline}</span></div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-[#e0e0e0]">Job Description:</h3>
              <p className="text-[#a0a0a0]">{selectedJob.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-[#e0e0e0]">Requirements:</h3>
              <p className="text-[#a0a0a0]">{selectedJob.requirements}</p>
            </div>
            
            {user.role === 'student' && (
              <div className="flex space-x-4">
                <button 
                  className="px-6 py-2 bg-[#4caf9e] text-white rounded-lg hover:bg-[#3d9b8d] transition-colors"
                  onClick={handleApply}
                >
                  Apply
                </button>
                <button 
                  className={`px-6 py-2 border text-white rounded-lg transition-colors ${
                    savedJobs.some(job => job.id === selectedJob.id) 
                      ? 'bg-[#4caf9e] border-[#4caf9e]' 
                      : 'border-[#3a3a3a] hover:bg-[#333333]'
                  }`}
                  onClick={handleSave}
                >
                  {savedJobs.some(job => job.id === selectedJob.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Apply confirmation modal */}
      {showApplyConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white mb-4">redirecting to external website</h2>
            <p className="text-[#e0e0e0] mb-6">
              this job application requires you to continue on the company's website. 
              are you sure you want to proceed?
            </p>
            <div className="flex space-x-4">
              <button 
                className="px-6 py-2 bg-[#4caf9e] text-white rounded-lg flex-1 hover:bg-[#3d9b8d] transition-colors"
                onClick={confirmApply}
              >
                yes, continue
              </button>
              <button 
                className="px-6 py-2 border border-[#3a3a3a] text-white rounded-lg flex-1 hover:bg-[#333333] transition-colors"
                onClick={() => setShowApplyConfirm(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Save notification */}
      {showSaveNotification && (
        <div className="fixed bottom-4 right-4 bg-[#4caf9e] text-white py-2 px-4 rounded-lg shadow-lg">
          job saved!
        </div>
      )}
      
      {/* Saved Jobs Modal */}
      {showSavedJobsModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">saved jobs</h2>
              <button 
                onClick={() => setShowSavedJobsModal(false)}
                className="text-[#888888] hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {savedJobs.length > 0 ? (
              <div className="space-y-3">
                {savedJobs.map(job => (
                  <div key={job.id} className="p-3 border border-[#3a3a3a] bg-[#333333] rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 
                          className="font-medium text-white hover:text-[#4caf9e] cursor-pointer"
                          onClick={() => viewJobDetails(job)}
                        >
                          {job.title}
                        </h3>
                        <div className="text-sm text-[#a0a0a0]">{job.company}</div>
                        <div className="text-sm text-[#a0a0a0]">{job.location}</div>
                      </div>
                      
                      <button 
                        className="text-[#888888] hover:text-white self-start"
                        onClick={() => removeSavedJob(job.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#a0a0a0]">
                you haven't saved any jobs yet.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Applied Jobs Modal */}
      {showAppliedJobsModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">applied jobs</h2>
              <button 
                onClick={() => setShowAppliedJobsModal(false)}
                className="text-[#888888] hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {appliedJobs.length > 0 ? (
              <div className="space-y-3">
                {appliedJobs.map(job => (
                  <div key={job.id} className="p-3 border border-[#3a3a3a] bg-[#333333] rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h3 
                          className="font-medium text-white hover:text-[#4caf9e] cursor-pointer"
                          onClick={() => viewJobDetails(job)}
                        >
                          {job.title}
                        </h3>
                        <div className="text-sm text-[#a0a0a0]">{job.company}</div>
                        <div className="text-sm text-[#a0a0a0]">{job.location}</div>
                        <div className="text-xs text-[#4caf9e] mt-1">Application Submitted</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#a0a0a0]">
                you haven't applied to any jobs yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}