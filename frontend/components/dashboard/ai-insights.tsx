"use client";

import { useEffect, useState } from 'react';
import { BarChart3, BrainCircuitIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { analyzeCoinsWithAI, type CoinAnalysis } from '@/lib/zora';

export function AIInsights() {
  const [insights, setInsights] = useState<CoinAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        
        // Normally we would use wallet-connected data, but for demo use placeholder addresses
        const mockAddresses = [
          '0x1234567890123456789012345678901234567890',
          '0x22633dbf3c5fcc2c0d3301889abc2a571dad7db1'
        ];
        
        const analysisResults = await analyzeCoinsWithAI(mockAddresses);
        setInsights(analysisResults);
      } catch (error) {
        console.error('Error fetching AI insights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only load insights if we have a wallet or in demo mode
    fetchInsights();
  }, []);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <BrainCircuitIcon className="h-5 w-5 text-gray-400" />
        <h2 className="text-xl font-bold">AI Insights</h2>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse bg-gray-900 border border-gray-800 rounded-md p-6 h-64">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-800 rounded w-2/3 mb-6"></div>
          <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      ) : !isWalletConnected ? (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-6 h-64">
          <div className="text-sm text-gray-400 mb-2">Top Recommendation</div>
          <div className="text-lg font-bold mb-4">Connect wallet to see personalized insights</div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Powered by TensorFlow.js analysis</div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-6 h-64">
          {insights.length > 0 ? (
            <>
              <div className="text-sm text-gray-400 mb-2">Top Recommendation</div>
              <div className="flex items-center space-x-2 mb-1">
                {insights[0].recommendation === 'Buy' && (
                  <TrendingUpIcon className="h-5 w-5 text-green-500" />
                )}
                {insights[0].recommendation === 'Sell' && (
                  <TrendingDownIcon className="h-5 w-5 text-red-500" />
                )}
                <div className="text-lg font-bold">
                  {insights[0].recommendation} {insights[0].coinAddress.substring(0, 6)}...
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Confidence score: {(Math.abs(insights[0].trendScore) * 100).toFixed(0)}%
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400">Sentiment</div>
                  <div className="text-sm">
                    {insights[0].sentimentScore > 0 ? 'Positive' : 'Negative'} 
                    ({(insights[0].sentimentScore * 100).toFixed(0)}%)
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Volume Growth</div>
                  <div className="text-sm">
                    {insights[0].volumeGrowth > 0 ? '+' : ''}
                    {(insights[0].volumeGrowth * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-bold mb-4">No AI insights available yet</div>
              <div className="text-sm text-gray-400">Check back soon for personalized recommendations</div>
            </>
          )}
          <div className="mt-auto pt-2 text-xs text-gray-400">
            Powered by TensorFlow.js analysis
          </div>
        </div>
      )}
    </div>
  );
} 