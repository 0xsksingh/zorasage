"use client";

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { getUserCoinBalances } from '@/lib/zora';
import { useAccount } from 'wagmi';
import { BarChart3, TrendingUpIcon, ArrowUpIcon, ArrowDownIcon, WalletIcon } from 'lucide-react';

export default function PortfolioOverview() {
  const { address } = useAccount();
  const { portfolio, setPortfolio } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [totalChange, setTotalChange] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState('$9.00');
  
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
  
  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      // Check if window.ethereum is available
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        setIsConnected(true);
        
        // Here you would fetch user balances from your API
        // const balances = await getUserCoinBalances({ address });
        // Process balances
      } else {
        alert('Please install a Web3 wallet like MetaMask to connect');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Placeholder portfolio chart data
  const generateChartData = () => {
    // Mock chart data - in a real app this would come from an API
    const now = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - (24 - i));
      return {
        time: date.toISOString(),
        value: 4 + Math.sin(i / 2) * 1.5 + i / 10 // Create a wave pattern with upward trend
      };
    });
  };
  
  const chartData = generateChartData();
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <WalletIcon className="h-5 w-5 text-gray-400" />
          <h2 className="text-xl font-bold">Portfolio</h2>
        </div>
      </div>
      
      {!isConnected ? (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-6 flex flex-col items-center justify-center h-64">
          <div className="text-lg mb-2">Connect your wallet to see your portfolio</div>
          <div className="text-sm text-gray-400 mb-6">{balance}</div>
          <button 
            className="px-4 py-2 rounded-md bg-white text-black font-medium"
            onClick={connectWallet}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-400">Portfolio Value</div>
              <div className="text-2xl font-bold">{balance}</div>
            </div>
            <div className="text-sm text-gray-400">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </div>
          </div>
          
          {/* Portfolio chart */}
          <div className="h-48 w-full bg-gray-800 rounded-md p-4">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={chartData.map((point, i) => `${(i / (chartData.length - 1)) * 100},${100 - point.value * 10}`).join(' ')}
                fill="none"
                stroke="#4F46E5"
                strokeWidth="2"
              />
            </svg>
          </div>
          
          {/* Coin holdings would go here */}
          <div className="mt-4">
            <div className="text-sm text-gray-400 mb-2">Your Holdings</div>
            <div className="text-center text-gray-400 py-4">
              No coins in your portfolio yet
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 