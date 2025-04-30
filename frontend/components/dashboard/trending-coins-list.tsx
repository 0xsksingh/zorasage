"use client";

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getCoinDetails } from '@/lib/zora';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from 'lucide-react';

interface CoinDetails {
  address: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  priceChange24h: number;
  currentPrice: number;
}

export default function TrendingCoinsList() {
  const { trendingCoins } = useAppStore();
  const [coinDetails, setCoinDetails] = useState<CoinDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCoinDetails = async () => {
      if (trendingCoins.length === 0) return;
      
      setLoading(true);
      try {
        const details: CoinDetails[] = [];
        
        for (const address of trendingCoins) {
          try {
            const response = await getCoinDetails({ coinAddress: address });
            if (response?.data) {
              details.push({
                address,
                name: response.data.name || 'Unknown',
                symbol: response.data.symbol || '???',
                imageUrl: response.data.image || undefined,
                // Mock data for now - would be replaced with actual price data
                priceChange24h: Math.random() * 20 - 10, // -10% to +10%
                currentPrice: Math.random() * 10, // 0 to 10
              });
            }
          } catch (error) {
            console.error(`Error fetching details for coin ${address}:`, error);
          }
        }
        
        setCoinDetails(details);
      } catch (error) {
        console.error('Error fetching coin details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoinDetails();
  }, [trendingCoins]);
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <TrendingUpIcon className="h-5 w-5 mr-2 text-primary" />
          Trending Coins
        </h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {coinDetails.map((coin) => (
            <div key={coin.address} className="p-3 hover:bg-muted/50 rounded-md flex items-center justify-between transition-colors">
              <div className="flex items-center">
                {coin.imageUrl ? (
                  <img 
                    src={coin.imageUrl} 
                    alt={coin.name} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    {coin.symbol.substring(0, 1)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{coin.name}</p>
                  <p className="text-sm text-muted-foreground">${coin.symbol}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium">${coin.currentPrice.toFixed(2)}</p>
                <p className={`text-sm flex items-center ${
                  coin.priceChange24h >= 0 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {coin.priceChange24h >= 0 
                    ? <ArrowUpIcon className="h-3 w-3 mr-1" /> 
                    : <ArrowDownIcon className="h-3 w-3 mr-1" />
                  }
                  {Math.abs(coin.priceChange24h).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
          
          {coinDetails.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <p>No trending coins found</p>
              <p className="text-sm">Check back later for updates</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-2 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:underline">
          View All Trending Coins
        </button>
      </div>
    </div>
  );
} 