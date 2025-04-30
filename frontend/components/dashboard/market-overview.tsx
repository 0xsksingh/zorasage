"use client";

import { LineChart, Wallet, MessageSquare, LineChartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock chart data
const generateMockChartData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate a somewhat realistic-looking price chart
    // Starting around 5 and ending around 8
    const baseValue = 5;
    const trend = 3 * (30 - i) / 30; // Overall upward trend
    const random = Math.sin(i / 3) * 0.5 + (Math.random() - 0.5) * 0.3; // Some randomness and waves
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: baseValue + trend + random,
    });
  }
  
  return data;
};

export default function MarketOverview() {
  const [stats, setStats] = useState({
    totalVolume: '$24.5M',
    activeTraders: '12.4K',
    newCoins: '125',
    avgSentiment: 'Bullish',
  });
  
  const [chartData, setChartData] = useState(generateMockChartData());
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
          Market Overview
        </h2>
        <div className="flex space-x-2">
          <button className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">1D</button>
          <button className="px-2 py-1 text-xs rounded-md text-muted-foreground hover:bg-muted">1W</button>
          <button className="px-2 py-1 text-xs rounded-md text-muted-foreground hover:bg-muted">1M</button>
          <button className="px-2 py-1 text-xs rounded-md text-muted-foreground hover:bg-muted">ALL</button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
          <p className="text-xl font-bold">{stats.totalVolume}</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Active Traders</p>
          <p className="text-xl font-bold">{stats.activeTraders}</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">New Coins</p>
          <p className="text-xl font-bold">{stats.newCoins}</p>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
          <p className="text-xl font-bold">{stats.avgSentiment}</p>
        </div>
      </div>
      
      <div className="h-64 relative">
        {/* In a real implementation, we would use Recharts or similar */}
        <div className="absolute inset-0 flex items-end">
          {chartData.map((point, index) => (
            <div 
              key={point.date} 
              className="flex-1 bg-primary/20 hover:bg-primary/30 transition-colors rounded-t-sm"
              style={{ height: `${(point.value / 10) * 100}%` }}
              title={`${point.date}: $${point.value.toFixed(2)}`}
            ></div>
          ))}
        </div>
        <div className="absolute right-2 top-0 text-xs text-muted-foreground">$9.00</div>
        <div className="absolute right-2 bottom-0 text-xs text-muted-foreground">$4.00</div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 border border-border rounded-md flex items-center">
          <div className="mr-3 p-2 bg-primary/10 rounded-full">
            <LineChart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Trading Volume</p>
            <p className="text-xs text-muted-foreground">+12.5% from last week</p>
          </div>
        </div>
        
        <div className="p-3 border border-border rounded-md flex items-center">
          <div className="mr-3 p-2 bg-primary/10 rounded-full">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">New Wallets</p>
            <p className="text-xs text-muted-foreground">+8.3% from last week</p>
          </div>
        </div>
        
        <div className="p-3 border border-border rounded-md flex items-center">
          <div className="mr-3 p-2 bg-primary/10 rounded-full">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Social Engagement</p>
            <p className="text-xs text-muted-foreground">+24.7% from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
} 