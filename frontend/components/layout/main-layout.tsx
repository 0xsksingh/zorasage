import React from 'react';
import { useAppStore } from '@/lib/store';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        
        <main className={`flex-1 overflow-y-auto transition-all ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}>
          <div className="container mx-auto py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 