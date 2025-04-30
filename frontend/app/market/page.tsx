'use client';

import { useState, useEffect } from 'react';
import { SearchIcon, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon, SlidersHorizontal } from 'lucide-react';
import { getTrendingCoins } from '@/lib/zora';

interface CoinData {
  address: string;
  name: string;
  symbol: string;
  price: string;
  priceChange24h: string;
  volume24h: string;
}

export default function MarketPage() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('volume');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        const response = await getTrendingCoins({ limit: 20 });
        if (response && response.coins) {
          setCoins(response.coins);
        }
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);

  // Filter coins based on search query
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format large numbers
  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  // Determine if price change is positive or negative
  const isPriceChangePositive = (change: string): boolean => {
    return !change.includes('-');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Market</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search coins by name or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md bg-gray-900 border-gray-800 text-sm text-white placeholder-gray-400 py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-900 border border-gray-800 text-sm">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <select 
            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-800 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="volume">Volume</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
          </select>
          <button 
            className="px-3 py-2 rounded-md bg-gray-900 border border-gray-800 text-sm"
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      
      {/* Coin table */}
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-800 rounded w-full"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800 rounded w-full"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Coin</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium text-right">24h Change</th>
                <th className="px-4 py-3 font-medium text-right">Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin, index) => (
                <tr key={coin.address} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-4 py-4 text-gray-400">{index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-medium mr-3">
                        {coin.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">{coin.price}</td>
                  <td className="px-4 py-4 text-right">
                    <div className={`flex items-center justify-end ${
                      isPriceChangePositive(coin.priceChange24h) ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {isPriceChangePositive(coin.priceChange24h) ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {coin.priceChange24h}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">{formatNumber(coin.volume24h)}</td>
                </tr>
              ))}
              
              {filteredCoins.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No coins found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 