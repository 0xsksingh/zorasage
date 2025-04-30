"use client";

import { client } from '@/lib/thirdweb';
import { BarChart3, UsersRound, MessageSquare, LineChart, WalletIcon } from 'lucide-react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { MarketOverview } from '@/components/dashboard/market-overview';
import { TrendingCoinsList } from '@/components/dashboard/trending-coins-list';
import { AIInsights } from '@/components/dashboard/ai-insights';


export default function Dashboard() {
  const account = useActiveAccount();
  const isConnected = !!account;
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Overview Section */}
        <section className="space-y-6">
          <MarketOverview />
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-medium text-gray-400">Trading Volume</div>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-sm font-semibold">+12.5% from last week</div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-medium text-gray-400">New Wallets</div>
                <UsersRound className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-sm font-semibold">+8.3% from last week</div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-md p-3">
              <div className="flex items-center justify-between pb-2">
                <div className="text-xs font-medium text-gray-400">Social Engagement</div>
                <MessageSquare className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-sm font-semibold">+24.7% from last week</div>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <WalletIcon className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-bold">Portfolio</h2>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-md p-6 flex flex-col items-center justify-center h-64">
              { !isConnected ? <div className="text-lg mb-2">Connect your wallet to see your portfolio</div> : <div className="text-sm text-gray-400 mb-6">$9.00</div>}
              <ConnectButton client={client} />
            </div>
          </div>
          
          {/* AI Insights */}
          <AIInsights />
        </section>
      </div>
    </div>
  );
}
