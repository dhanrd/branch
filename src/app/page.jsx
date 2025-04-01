'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard/home');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1a1a1a]">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Branch</h1>
        <p className="text-xl mb-8 text-[#a0a0a0]">connect with students, find events, and discover job opportunities</p>
        
        <div className="space-y-4">
          <Link 
            href="/auth/signup"
            className="block w-full py-3 px-6 bg-[#4caf9e] text-white rounded-lg font-medium hover:bg-[#3d9b8d] transition-colors"
          >
            get started
          </Link>
          
          <Link
            href="/auth/login"
            className="block w-full py-3 px-6 bg-[#333333] border border-[#444444] rounded-lg font-medium text-white hover:bg-[#3a3a3a] transition-colors"
          >
            already have an account? sign in
          </Link>
        </div>
      </div>
    </div>
  );
}