'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/context/AuthContext';

export default function Signup() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard/home');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1a1a1a]">
      <SignupForm />
    </div>
  );
}