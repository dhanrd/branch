'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('Invalid username or password.');
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-[#2d2d2d] rounded-lg shadow-md border border-[#3a3a3a]">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">sign in</h1>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/30 text-red-400 rounded border border-red-800">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[#e0e0e0]">email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-[#333333] border-[#444444] text-white"
            placeholder="enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-[#e0e0e0]">password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-[#333333] border-[#444444] text-white"
            placeholder="enter your password"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#4caf9e] text-white rounded-lg hover:bg-[#3d9b8d] transition-colors"
        >
          sign in
        </button>
        
        <div className="mt-4 text-center text-sm text-[#a0a0a0]">
          <span>don't have an account? </span>
          <Link href="/auth/signup" className="text-[#4caf9e] hover:underline">
            sign up
          </Link>
        </div>
      </form>
    </div>
  );
}