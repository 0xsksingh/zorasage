"use client";

import { useEffect, useState } from 'react';
import { TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { getTrendingCoins } from '@/lib/zora';

interface TrendingCoin {
  address: string;
  name: string;
  symbol: string;
  price: string;
  priceChange24h: string;
  volume24h: string;
}

export function TrendingCoinsList() {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setIsLoading(true);
        const response = await getTrendingCoins({ limit: 5 });
        if (response && response.coins) {
          setTrendingCoins(response.coins);
        }
      } catch (error) {
        console.error('Error fetching trending coins:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []);

  // Helper function to format price changes
  const formatPriceChange = (change: string) => {
    // Remove + or - and % from the string to get the numeric value
    const value = parseFloat(change.replace(/[+\-%]/g, ''));
    const isPositive = !change.includes('-');
    
    return {
      value,
      isPositive,
      formatted: change
    };
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUpIcon className="h-5 w-5 text-gray-400" />
        <h2 className="text-xl font-bold">Trending Coins</h2>
      </div>
      
      {isLoading ? (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-800"></div>
                  <div className="ml-3">
                    <div className="h-4 w-24 bg-gray-800 rounded"></div>
                    <div className="h-3 w-16 bg-gray-800 rounded mt-2"></div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="h-4 w-16 bg-gray-800 rounded"></div>
                  <div className="h-3 w-12 bg-gray-800 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-4 divide-y divide-gray-800">
          {trendingCoins.length > 0 ? (
            trendingCoins.map((coin) => {
              const priceChange = formatPriceChange(coin.priceChange24h);
              
              return (
                <div key={coin.address} className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium">
                      {coin.symbol.substring(0, 2)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-medium">{coin.price}</div>
                    <div className={`text-sm flex items-center ${
                      priceChange.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {priceChange.isPositive ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {priceChange.formatted}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-6 text-center text-gray-400">
              No trending coins available
            </div>
          )}
          
          <div className="pt-3 flex justify-center">
            <button className="text-blue-500 text-sm hover:underline">
              View all coins
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 