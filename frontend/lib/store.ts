import { create } from 'zustand';
import { CoinAnalysis } from './zora';

// Types for our store
interface Portfolio {
  coinAddress: string;
  balance: string;
  value: number;
  performance: number;
}

interface Strategy {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  parameters: Record<string, any>;
}

interface AIRecommendation {
  coinAddress: string;
  name: string;
  recommendation: 'buy' | 'sell' | 'hold';
  confidenceScore: number;
  reason: string;
}

interface AppState {
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Portfolio State
  portfolio: Portfolio[];
  setPortfolio: (portfolio: Portfolio[]) => void;
  
  // AI Analysis State
  coinAnalyses: CoinAnalysis[];
  setCoinAnalyses: (analyses: CoinAnalysis[]) => void;
  
  // Trading Strategies
  strategies: Strategy[];
  setStrategies: (strategies: Strategy[]) => void;
  addStrategy: (strategy: Omit<Strategy, 'id'>) => void;
  updateStrategy: (id: number, strategy: Partial<Strategy>) => void;
  deleteStrategy: (id: number) => void;
  
  // AI Recommendations
  recommendations: AIRecommendation[];
  setRecommendations: (recommendations: AIRecommendation[]) => void;
  
  // Trending Coins
  trendingCoins: string[];
  setTrendingCoins: (coins: string[]) => void;
  
  // User Settings
  userSettings: {
    darkMode: boolean;
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    notificationsEnabled: boolean;
  };
  updateSettings: (settings: Partial<AppState['userSettings']>) => void;
}

// Create the store
export const useAppStore = create<AppState>((set) => ({
  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  // Portfolio State
  portfolio: [],
  setPortfolio: (portfolio) => set({ portfolio }),
  
  // AI Analysis State
  coinAnalyses: [],
  setCoinAnalyses: (coinAnalyses) => set({ coinAnalyses }),
  
  // Trading Strategies
  strategies: [],
  setStrategies: (strategies) => set({ strategies }),
  addStrategy: (strategy) => set((state) => ({
    strategies: [...state.strategies, { ...strategy, id: Date.now() }]
  })),
  updateStrategy: (id, updatedStrategy) => set((state) => ({
    strategies: state.strategies.map(s => 
      s.id === id ? { ...s, ...updatedStrategy } : s
    )
  })),
  deleteStrategy: (id) => set((state) => ({
    strategies: state.strategies.filter(s => s.id !== id)
  })),
  
  // AI Recommendations
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),
  
  // Trending Coins
  trendingCoins: [],
  setTrendingCoins: (trendingCoins) => set({ trendingCoins }),
  
  // User Settings
  userSettings: {
    darkMode: true,
    riskProfile: 'moderate',
    notificationsEnabled: true,
  },
  updateSettings: (newSettings) => set((state) => ({
    userSettings: { ...state.userSettings, ...newSettings }
  })),
})); 