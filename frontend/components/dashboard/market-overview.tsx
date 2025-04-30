"use client";

import { useEffect, useState } from 'react';
import { LineChart, BarChart } from 'lucide-react';
import { getMarketOverview } from '@/lib/zora';

export function MarketOverview() {
  const [marketData, setMarketData] = useState({
    totalVolume: 0,
    activeTraders: 0,
    newCoins: 0,
    sentiment: 'Neutral'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        const data = await getMarketOverview();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const generateChartData = () => {
    // Mock chart data - in a real app this would come from an API
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - (24 - i));
      return {
        time: date.toISOString(),
        value: 5 + Math.sin(i / 3) * 2 + i / 8 // Create a wave pattern with upward trend
      };
    });
  };

  const chartData = generateChartData();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LineChart className="h-5 w-5 text-gray-400" />
          <h2 className="text-xl font-bold">Market Overview</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className={`px-3 py-1 rounded-md text-sm ${timeframe === '1D' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setTimeframe('1D')}
          >
            1D
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${timeframe === '1W' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setTimeframe('1W')}
          >
            1W
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${timeframe === '1M' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setTimeframe('1M')}
          >
            1M
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm ${timeframe === 'ALL' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
            onClick={() => setTimeframe('ALL')}
          >
            ALL
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-16 bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-800 rounded"></div>
            <div className="h-16 bg-gray-800 rounded"></div>
          </div>
          <div className="h-64 bg-gray-800 rounded mt-4"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-400">Total Volume</div>
              <div className="text-2xl font-bold">{formatCurrency(marketData.totalVolume)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Active Traders</div>
              <div className="text-2xl font-bold">{formatNumber(marketData.activeTraders)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">New Coins</div>
              <div className="text-2xl font-bold">{marketData.newCoins}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Sentiment</div>
              <div className={`text-2xl font-bold ${
                marketData.sentiment === 'Bullish' ? 'text-green-500' : 
                marketData.sentiment === 'Bearish' ? 'text-red-500' : 'text-yellow-500'
              }`}>{marketData.sentiment}</div>
            </div>
          </div>
          
          {/* Simple SVG line chart */}
          <div className="h-64 w-full mt-4 bg-gray-800 rounded-md p-4">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={chartData.map((point, i) => `${(i / (chartData.length - 1)) * 100},${100 - point.value * 5}`).join(' ')}
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
} 