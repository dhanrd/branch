'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function CreateJobPosting({ onClose, onJobCreated }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    location: '',
    type: 'Full-time', // Default
    description: '',
    requirements: '',
    salary: '',
    deadline: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Job types for the dropdown
  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Co-op', 'New Grad', 'Contract'];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Requirements are required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Application deadline is required';
    
    // Validate date format for deadline
    if (formData.deadline) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.deadline)) {
        newErrors.deadline = 'Please use YYYY-MM-DD format';
      } else {
        const selectedDate = new Date(formData.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          newErrors.deadline = 'Deadline cannot be in the past';
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Create a new job with current date and default views
      const newJob = {
        id: Math.floor(Math.random() * 10000), // Generate random ID
        ...formData,
        posted: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        views: 0,
      };
      
    setIsSubmitting(false);

    // Call the callback with the new job
    if (onJobCreated) {
    onJobCreated(newJob);
    }
    
    // Close the modal
    if (onClose) {
    onClose();
    }
    
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Format today's date as YYYY-MM-DD for the date input min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 modal-overlay"
      onClick={onClose}
    >
      <div 
        className="bg-[#2d2d2d] border border-[#3a3a3a] rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Create New Job Posting</h2>
          <button 
            onClick={onClose}
            className="text-[#888888] hover:text-white text-2xl font-light"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-[#e0e0e0] font-medium mb-1">
              Job Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 bg-[#333333] text-white rounded border ${
                errors.title ? 'border-red-500' : 'border-[#444444]'
              }`}
              placeholder="e.g. Full Stack Developer"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          {/* Company */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-[#e0e0e0] font-medium mb-1">
              Company*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full p-3 bg-[#333333] text-white rounded border ${
                errors.company ? 'border-red-500' : 'border-[#444444]'
              }`}
              placeholder={user?.company || 'Your company name'}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
          </div>
          
          {/* Location and Job Type - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="location" className="block text-[#e0e0e0] font-medium mb-1">
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-3 bg-[#333333] text-white rounded border ${
                  errors.location ? 'border-red-500' : 'border-[#444444]'
                }`}
                placeholder="e.g. Calgary, AB"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            
            <div>
              <label htmlFor="type" className="block text-[#e0e0e0] font-medium mb-1">
                Job Type*
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-[#e0e0e0] font-medium mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 bg-[#333333] text-white rounded border ${
                errors.description ? 'border-red-500' : 'border-[#444444]'
              }`}
              placeholder="Describe the job position and responsibilities"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          
          {/* Requirements */}
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-[#e0e0e0] font-medium mb-1">
              Requirements*
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              className={`w-full p-3 bg-[#333333] text-white rounded border ${
                errors.requirements ? 'border-red-500' : 'border-[#444444]'
              }`}
              placeholder="List required skills, education, experience, etc."
            ></textarea>
            {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
          </div>
          
          {/* Salary and Deadline - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="salary" className="block text-[#e0e0e0] font-medium mb-1">
                Compensation
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                placeholder="e.g. $50,000-60,000/year or $25-30/hour"
              />
              <p className="text-[#888888] text-sm mt-1">Recommended but not required</p>
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-[#e0e0e0] font-medium mb-1">
                Application Deadline*
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={today}
                className={`w-full p-3 bg-[#333333] text-white rounded border ${
                  errors.deadline ? 'border-red-500' : 'border-[#444444]'
                }`}
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 mr-3 border border-[#444444] text-white rounded-lg hover:bg-[#333333]"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4caf9e] text-white rounded-lg hover:bg-[#3d9b8d] disabled:bg-[#2d7d6e] disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}