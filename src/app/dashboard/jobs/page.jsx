'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import CreateJobPosting from '@/components/jobs/CreateJobPosting';

// Dummy job listing data
const dummyJobs = [
  {
    id: 1,
    title: 'Full Stack Developer Intern',
    company: 'Solium (Shareworks)',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Join our development team to build financial technology solutions for equity management. You\'ll work with experienced developers on real projects that impact our clients globally.',
    requirements: 'Experience with JavaScript, React, and Node.js. Knowledge of RESTful APIs. Currently enrolled in Computer Science or Software Engineering program.',
    posted: '2025-04-07',
    deadline: '2025-04-30',
    salary: '$25-30/hour',
    views: 28
  },
  {
    id: 2,
    title: 'Software Engineering Intern',
    company: 'Benevity',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Help build tech solutions that power corporate giving and volunteer programs. You\'ll contribute to our cloud platform that connects companies with causes worldwide.',
    requirements: 'Proficiency in Java and SQL. Knowledge of Spring Framework is a plus. Strong understanding of OOP concepts.',
    posted: '2025-04-06',
    deadline: '2025-05-15',
    salary: '$24-28/hour',
    views: 43
  },
  {
    id: 3,
    title: 'Machine Learning Co-op Student',
    company: 'ATB Financial',
    location: 'Calgary, AB',
    type: 'Co-op',
    description: 'Apply machine learning techniques to financial data to develop innovative solutions for our customers and internal operations.',
    requirements: 'Experience with Python, pandas, and machine learning libraries like TensorFlow or PyTorch. Strong mathematical background.',
    posted: '2025-04-02',
    deadline: '2025-04-22',
    salary: '$26-32/hour',
    views: 87
  },
  {
    id: 4,
    title: 'Junior Cybersecurity Analyst',
    company: 'TELUS',
    location: 'Calgary, AB',
    type: 'New Grad',
    description: 'Join our security operations team to monitor, identify and respond to security threats across our network infrastructure.',
    requirements: 'Degree in Computer Science, Information Security or related field. Knowledge of network security principles and common security tools.',
    posted: '2025-04-04',
    deadline: '2025-05-01',
    salary: '$65,000-75,000/year',
    views: 62
  },
  {
    id: 5,
    title: 'Cloud Engineering Intern',
    company: 'TC Energy',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Work with our cloud engineering team to develop and maintain our AWS infrastructure, implement CI/CD pipelines, and automate cloud processes.',
    requirements: 'Experience with AWS services, infrastructure as code (Terraform/CloudFormation), and scripting languages like Python or Bash.',
    posted: '2025-03-26',
    deadline: '2025-04-15',
    salary: '$23-27/hour',
    views: 104
  },
  {
    id: 6,
    title: 'Software Developer New Grad',
    company: 'Helcim',
    location: 'Calgary, AB',
    type: 'New Grad',
    description: 'Join our growing fintech company to help build payment processing solutions for businesses across North America.',
    requirements: 'Degree in Computer Science or related field. Experience with web development technologies and payment systems is a plus.',
    posted: '2025-04-02',
    deadline: '2025-05-30',
    salary: '$70,000-80,000/year',
    views: 76
  },
  {
    id: 7,
    title: 'Data Science Intern',
    company: 'AltaML',
    location: 'Calgary, AB',
    type: 'Internship',
    description: 'Apply data science techniques to solve real business problems for our clients in energy, healthcare, and finance sectors.',
    requirements: 'Strong background in statistics and experience with data analysis tools. Knowledge of machine learning frameworks and SQL.',
    posted: '2025-04-06',
    deadline: '2025-04-25',
    salary: '$24-29/hour',
    views: 31
  },
  {
    id: 8,
    title: 'DevOps Co-op Student',
    company: 'Symend',
    location: 'Calgary, AB',
    type: 'Co-op',
    description: 'Help our engineering team build and maintain our deployment pipelines, monitoring systems, and cloud infrastructure.',
    requirements: 'Knowledge of Linux, containerization, and cloud platforms (AWS/Azure/GCP). Experience with CI/CD tools like Jenkins or GitHub Actions.',
    posted: '2025-04-02',
    deadline: '2025-05-10',
    salary: '$25-28/hour',
    views: 52
  }
];

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(dummyJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterOption, setFilterOption] = useState('Relevant');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showApplyConfirm, setShowApplyConfirm] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showSavedJobsModal, setShowSavedJobsModal] = useState(false);
  const [showAppliedJobsModal, setShowAppliedJobsModal] = useState(false);
  const [showCompanyJobsModal, setShowCompanyJobsModal] = useState(false);

  // Filter and sort jobs
  useEffect(() => {
    // Apply search filter
    let results = jobs;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = jobs.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) || 
        job.description.toLowerCase().includes(term) ||
        job.requirements.toLowerCase().includes(term) ||
        job.type.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (filterOption === 'Recent') {
      // Sort by date (newest first)
      results = [...results].sort((a, b) => 
        new Date(b.posted) - new Date(a.posted)
      );
    } else if (filterOption === 'Top') {
      // Sort by views (highest first)
      results = [...results].sort((a, b) => b.views - a.views);
    }
    // If 'Relevant', keep default order
    
    setFilteredJobs(results);
  }, [jobs, searchTerm, filterOption]);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
    setShowFilterDropdown(false);
  };

  // Handler for job creation
  const handleJobCreated = (newJob) => {
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    
    // Show a success notification
    alert('Job posting created successfully!');
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

  // Function to format date in a readable way
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">job board</h1>
        <div className="relative w-1/2">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 bg-[#3a3a3a] rounded-full text-white border-none"
          />
          <div className="absolute left-3 top-2 text-[#888888]">
            🔍
          </div>
        </div>
        
        {user.role === 'employer' && (
          <button 
            className="px-4 py-2 bg-[#4caf9e] text-white rounded-lg hover:bg-[#3d9b8d]"
            onClick={() => setShowCreateModal(true)}
          >
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
                <div className="flex justify-between mt-1">
                  <div className="text-xs text-[#888888]">Posted {formatDate(job.posted)}</div>
                  <div className="text-xs text-[#888888]">{job.views} views</div>
                </div>
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
          {user.role === 'student' ? (
            <>
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
            </>
          ) : (
            <button 
              className="flex items-center w-full hover:bg-[#333333] p-2 rounded transition-colors"
              onClick={() => setShowCompanyJobsModal(true)}
            >
              <svg className="w-6 h-6 text-[#888888] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <span className="text-[#888888]">View My Applications</span>
            </button>
          )}
        </div>
      </div>
    </div>
      
      {/* Company Jobs Modal */}
      {showCompanyJobsModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
          onClick={handleClickOutside}
        >
          <div className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">My Job Postings</h2>
              <button 
                onClick={() => setShowCompanyJobsModal(false)}
                className="text-[#888888] hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {jobs.filter(job => job.company === user.company).length > 0 ? (
              <div className="space-y-3">
                {jobs
                  .filter(job => job.company === user.company)
                  .map(job => (
                    <div 
                      key={job.id} 
                      className="p-3 border border-[#3a3a3a] bg-[#333333] rounded-lg cursor-pointer hover:bg-[#3a3a3a]"
                      onClick={() => setSelectedJob(job)}
                    >
                      <h3 className="font-medium text-white">{job.title}</h3>
                      <div className="text-sm text-[#a0a0a0]">{job.location} • {job.type}</div>
                      <div className="flex justify-between mt-1">
                        <div className="text-xs text-[#888888]">Posted {formatDate(job.posted)}</div>
                        <div className="text-xs text-[#888888]">{job.views} views</div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#a0a0a0]">
                You haven't posted any jobs yet.
              </div>
            )}
          </div>
        </div>
      )}

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
            
            <div className="mb-2">
              <div className="text-[#a0a0a0] text-lg font-medium">{selectedJob.views} views</div>
            </div>
            
            <div className="mb-4">
              <div className="text-lg text-[#e0e0e0]">{selectedJob.company}</div>
              <div className="text-[#a0a0a0]">{selectedJob.location} • {selectedJob.type}</div>
            </div>
            
            <div className="mb-6">
              <div>
                <span className="font-medium text-[#e0e0e0]">Posted:</span> 
                <span className="text-[#a0a0a0] ml-1">{formatDate(selectedJob.posted)}</span>
              </div>
              <div><span className="font-medium text-[#e0e0e0]">Application Deadline:</span> <span className="text-[#a0a0a0] ml-1">{formatDate(selectedJob.deadline)}</span></div>
              {selectedJob.salary && (
                <div><span className="font-medium text-[#e0e0e0]">Compensation:</span> <span className="text-[#a0a0a0] ml-1">{selectedJob.salary}</span></div>
              )}
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
      
      {/* Create job posting modal */}
      {showCreateModal && (
        <CreateJobPosting 
          onClose={() => setShowCreateModal(false)}
          onJobCreated={handleJobCreated}
        />
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
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-[#888888]">Posted {formatDate(job.posted)}</div>
                          <div className="text-xs text-[#888888]">{job.views} views</div>
                        </div>
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
                        <div className="flex justify-between mt-1">
                          <div className="text-xs text-[#888888]">Posted {formatDate(job.posted)}</div>
                          <div className="text-xs text-[#888888]">{job.views} views</div>
                        </div>
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