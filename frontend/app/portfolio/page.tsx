'use client';

import { useState, useEffect } from 'react';
import { WalletIcon, CoinsIcon, ArrowUpIcon, ArrowDownIcon, PlusCircleIcon, RefreshCwIcon } from 'lucide-react';
import { getUserCoinBalances } from '@/lib/zora';

export default function PortfolioPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  
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
        
        // Mock some portfolio data
        setPortfolio([
          {
            address: '0x22633dbf3c5fcc2c0d3301889abc2a571dad7db1',
            name: 'Zora Token',
            symbol: 'ZORA',
            balance: '32.5',
            price: '12.45',
            value: 404.625,
            change: '+5.2%',
            isPositiveChange: true
          },
          {
            address: '0x1234567890123456789012345678901234567890',
            name: 'Creator Coin',
            symbol: 'CREATE',
            balance: '108.23',
            price: '8.32',
            value: 900.47,
            change: '-2.1%',
            isPositiveChange: false
          }
        ]);
        setTotalValue(1305.095);
      } else {
        alert('Please install a Web3 wallet like MetaMask to connect');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isConnected) {
      connectWallet();
    }
  }, [isConnected]);
  
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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      
      {!isConnected ? (
        <div className="bg-gray-900 border border-gray-800 rounded-md p-12 flex flex-col items-center justify-center">
          <WalletIcon className="h-12 w-12 text-gray-400 mb-4" />
          <div className="text-xl font-medium mb-2">Connect your wallet</div>
          <div className="text-gray-400 mb-6 text-center max-w-md">
            Connect your wallet to view your portfolio and manage your Zora coins
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">Wallet</div>
              <div className="font-mono text-lg truncate">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">Total Value</div>
              <div className="text-xl font-bold">${totalValue.toFixed(2)}</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-md p-4">
              <div className="text-sm text-gray-400">Coins</div>
              <div className="text-xl font-bold">{portfolio.length}</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-md p-4 flex justify-between items-center">
              <button className="flex items-center text-blue-500 text-sm">
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button className="flex items-center text-blue-500 text-sm">
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Add Coins
              </button>
            </div>
          </div>
          
          {/* Portfolio Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Portfolio Value</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-gray-800 text-white text-sm">1D</button>
                <button className="px-3 py-1 rounded-md text-gray-400 text-sm">1W</button>
                <button className="px-3 py-1 rounded-md text-gray-400 text-sm">1M</button>
                <button className="px-3 py-1 rounded-md text-gray-400 text-sm">ALL</button>
              </div>
            </div>
            
            <div className="h-64 w-full bg-gray-800 rounded-md p-4">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={chartData.map((point, i) => `${(i / (chartData.length - 1)) * 100},${100 - point.value * 10}`).join(' ')}
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          
          {/* Portfolio Coins */}
          <div className="bg-gray-900 border border-gray-800 rounded-md p-6">
            <h2 className="text-lg font-medium mb-4">Your Coins</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="px-4 py-3 font-medium">Coin</th>
                    <th className="px-4 py-3 font-medium text-right">Balance</th>
                    <th className="px-4 py-3 font-medium text-right">Price</th>
                    <th className="px-4 py-3 font-medium text-right">Value</th>
                    <th className="px-4 py-3 font-medium text-right">24h Change</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((coin) => (
                    <tr key={coin.address} className="border-b border-gray-800 hover:bg-gray-800">
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
                      <td className="px-4 py-4 text-right font-medium">{coin.balance}</td>
                      <td className="px-4 py-4 text-right">${coin.price}</td>
                      <td className="px-4 py-4 text-right font-medium">${coin.value.toFixed(2)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className={`flex items-center justify-end ${
                          coin.isPositiveChange ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {coin.isPositiveChange ? (
                            <ArrowUpIcon className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-3 mr-1" />
                          )}
                          {coin.change}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 