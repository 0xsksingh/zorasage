"use client";

import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { getTrendingCoins, analyzeCoinsWithAI } from '@/lib/zora';
import { useAppStore } from '@/lib/store';
import TrendingCoinsList from '@/components/dashboard/trending-coins-list';
import PortfolioOverview from '@/components/dashboard/portfolio-overview';
import AIInsights from '@/components/dashboard/ai-insights';
import MarketOverview from '@/components/dashboard/market-overview';

export default function Home() {
  const { setTrendingCoins, setCoinAnalyses } = useAppStore();
  
  useEffect(() => {
    // Fetch trending coins when the page loads
    const fetchTrendingCoins = async () => {
      try {
        const response = await getTrendingCoins();
        if (response?.data) {
          const coinAddresses = response.data.map(coin => coin.address);
          setTrendingCoins(coinAddresses);
          
          // Run AI analysis on trending coins
          const analyses = await analyzeCoinsWithAI(coinAddresses);
          setCoinAnalyses(analyses);
        }
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      }
    };
    
    fetchTrendingCoins();
  }, [setTrendingCoins, setCoinAnalyses]);
  
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MarketOverview />
          </div>
          <div className="md:col-span-1">
            <PortfolioOverview />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TrendingCoinsList />
          </div>
          <div>
            <AIInsights />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
