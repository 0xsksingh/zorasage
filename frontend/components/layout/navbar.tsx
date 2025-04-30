import React from 'react';
import Link from 'next/link';
import { Search, BellIcon, ChevronLeft } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { client } from '@/lib/thirdweb';
import { ConnectButton } from 'thirdweb/react';

export function Navbar() {
  return (
    <header className="h-16 border-b border-gray-800 bg-black flex items-center px-4">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-400 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          
        </div>
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search coins..."
              className="w-full rounded-md bg-gray-900 border-gray-800 text-sm text-white placeholder-gray-400 py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" className="relative">
            <BellIcon className="h-5 w-5 text-gray-400" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Button>
          <ConnectButton client={client} />
        </div>
      </div>
    </header>
  );
} 