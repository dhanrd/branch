'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupForm() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    company: '',
    clubAffiliation: '',
    studentVerified: false
  });
  
  const router = useRouter();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerifyStudent = () => {
    setFormData(prev => ({ ...prev, studentVerified: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the signup function from AuthContext
    const success = signup(
      formData.username, 
      formData.email,
      formData.fullName,
      formData.company,
      formData.clubAffiliation,
      userType
    );
    
    if (success) {
      // Redirect based on user type
      if (userType === 'student') {
        router.push('/dashboard/home');
      } else {
        router.push('/dashboard/jobs');
      }
    } else {
      console.error('Failed to create user');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#3a3a3a]">
      {/* Tab selector */}
      <div className="flex w-full">
        <button
          className={`w-1/2 py-4 text-center text-xl ${userType === 'student' ? 'bg-[#1a1a1a] text-white' : 'bg-[#242424] text-gray-500'}`}
          onClick={() => setUserType('student')}
        >
          Student
        </button>
        <button
          className={`w-1/2 py-4 text-center text-xl ${userType === 'employer' ? 'bg-[#1a1a1a] text-white' : 'bg-[#242424] text-gray-500'}`}
          onClick={() => setUserType('employer')}
        >
          Employer
        </button>
      </div>

      {/* Form content */}
      <div className="p-8 bg-[#1a1a1a]">
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6">
          {/* Student Form */}
          {userType === 'student' && (
            <>
              <div className="col-span-12 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Username*
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                    required
                  />
                </div>
              </div>
              
              <div className="col-span-12">
                <label className="block text-white text-sm font-bold mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                  required
                />
              </div>
              <div className="col-span-12">
                <label className="block text-white text-sm font-bold mb-2">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                  required
                />
              </div>
              
              <div className="col-span-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Verify Student Status*
                </label>
                <button
                  type="button"
                  onClick={handleVerifyStudent}
                  className={`px-8 py-3 rounded ${formData.studentVerified 
                    ? 'bg-[#4caf9e] text-white' 
                    : 'bg-[#4caf9e] text-white'}`}
                >
                  Verify {formData.studentVerified && '✓'}
                </button>
              </div>
              
              <div className="col-span-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Club Affiliation
                </label>
                <input
                  type="text"
                  name="clubAffiliation"
                  value={formData.clubAffiliation}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Represent this club? <Link href="#" className="text-white underline">Verify here</Link> for official club moderation access
                </p>
              </div>
            </>
          )}

          {/* Employer Form */}
          {userType === 'employer' && (
            <>
              <div className="col-span-12 grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-bold mb-2">
                    Username*
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                    required
                  />
                </div>
              </div>
              
              <div className="col-span-12">
                <label className="block text-white text-sm font-bold mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                  required
                />
              </div>
              <div className="col-span-12">
                <label className="block text-white text-sm font-bold mb-2">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                  required
                />
              </div>
              
              <div className="col-span-12">
                <label className="block text-white text-sm font-bold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#333333] text-white rounded border border-[#444444]"
                />
                <p className="text-gray-400 text-sm mt-2">
                  By signing up, you confirm you are authorized to represent this entity
                </p>
              </div>
            </>
          )}

          <button
            type="submit"
            className="col-span-12 py-3 bg-[#4caf9e] text-white text-xl font-bold rounded hover:bg-[#3d9b8d] transition-colors mt-6"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}