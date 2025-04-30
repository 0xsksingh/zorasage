"use client";

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { getUserCoinBalances } from '@/lib/zora';
import { useAccount } from 'wagmi';
import { BarChart3, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

export default function PortfolioOverview() {
  const { address } = useAccount();
  const { portfolio, setPortfolio } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!address) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // In a real implementation, we would fetch actual data from the Zora API
        // For now, we'll create mock data
        const mockPortfolio = [
          {
            coinAddress: "0x1234567890abcdef1234567890abcdef12345678",
            balance: "356.45",
            value: 1582.34,
            performance: 12.5,
          },
          {
            coinAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
            balance: "124.78",
            value: 987.65,
            performance: -8.3,
          },
          {
            coinAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
            balance: "5642.12",
            value: 789.23,
            performance: 2.1,
          },
        ];
        
        setPortfolio(mockPortfolio);
        
        // Calculate totals
        const total = mockPortfolio.reduce((sum, coin) => sum + coin.value, 0);
        const weightedChange = mockPortfolio.reduce(
          (sum, coin) => sum + (coin.performance * coin.value),
          0
        ) / total;
        
        setTotalValue(total);
        setTotalChange(weightedChange);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolio();
  }, [address, setPortfolio]);
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Portfolio
        </h2>
      </div>
      
      {!address ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <p>Connect your wallet to see your portfolio</p>
          <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            Connect Wallet
          </button>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-end mt-1">
              <span className={`text-sm font-medium flex items-center ${
                totalChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {totalChange >= 0 
                  ? <ArrowUpIcon className="h-3 w-3 mr-1" /> 
                  : <ArrowDownIcon className="h-3 w-3 mr-1" />
                }
                {Math.abs(totalChange).toFixed(2)}%
              </span>
            </div>
          </div>
          
          <h3 className="text-sm font-medium mb-2">Your Coins</h3>
          <div className="space-y-3">
            {portfolio.length > 0 ? (
              portfolio.map((coin) => (
                <div key={coin.coinAddress} className="p-2 hover:bg-muted/50 rounded-md flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                      {coin.coinAddress.substring(2, 4).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">${coin.coinAddress.substring(2, 6).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{coin.balance} tokens</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">${coin.value.toFixed(2)}</p>
                    <p className={`text-xs flex items-center ${
                      coin.performance >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {coin.performance >= 0 
                        ? <ArrowUpIcon className="h-3 w-3 mr-0.5" /> 
                        : <ArrowDownIcon className="h-3 w-3 mr-0.5" />
                      }
                      {Math.abs(coin.performance).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p className="text-sm">No coins in your portfolio</p>
                <p className="text-xs mt-1">Start trading to build your portfolio</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 