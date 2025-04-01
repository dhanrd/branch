'use client';

import Sidebar from '@/components/layout/Sidebar';
import AuthCheck from '@/components/layout/AuthCheck';

export default function DashboardLayout({ children }) {
  return (
    <AuthCheck>
      <div className="flex min-h-screen bg-[#242424]">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthCheck>
  );
}