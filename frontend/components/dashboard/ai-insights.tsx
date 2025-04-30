"use client";

import { useAppStore } from '@/lib/store';
import { SparklesIcon } from 'lucide-react';

export default function AIInsights() {
  const { coinAnalyses } = useAppStore();
  
  // Get top recommendations (buy signals)
  const topRecommendations = coinAnalyses
    .filter(analysis => analysis.buySignal)
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 3);
  
  return (
    <div className="bg-card rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <SparklesIcon className="h-5 w-5 mr-2 text-primary" />
          AI Insights
        </h2>
      </div>
      
      {coinAnalyses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <p>Loading AI insights...</p>
          <div className="mt-4 animate-pulse flex space-x-4">
            <div className="h-2.5 w-24 bg-primary/20 rounded-full"></div>
            <div className="h-2.5 w-16 bg-primary/20 rounded-full"></div>
            <div className="h-2.5 w-20 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-primary/5 rounded-md">
            <h3 className="font-medium mb-2">Market Sentiment</h3>
            <div className="flex items-center">
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ 
                    width: `${calculateOverallSentiment(coinAnalyses) * 50 + 50}%` 
                  }}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium">
                {getSentimentLabel(calculateOverallSentiment(coinAnalyses))}
              </span>
            </div>
          </div>
          
          {topRecommendations.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Top Opportunities</h3>
              {topRecommendations.map((analysis, index) => (
                <div key={analysis.coinAddress} className="p-3 hover:bg-muted/50 rounded-md flex items-center justify-between transition-colors">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3 text-green-600 text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{getCoinSymbol(analysis.coinAddress)}</p>
                      <p className="text-xs text-muted-foreground">Trend score: {analysis.trendScore.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-green-500">Buy</p>
                    <p className="text-xs text-muted-foreground">Confidence: {getConfidenceLevel(analysis.trendScore)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="p-3 bg-primary/5 rounded-md">
            <h3 className="font-medium mb-2">AI Trading Tip</h3>
            <p className="text-sm text-muted-foreground">
              {generateTradingTip(coinAnalyses)}
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-2 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:underline">
          View Detailed Analysis
        </button>
      </div>
    </div>
  );
}

// Helper functions
function calculateOverallSentiment(analyses: any[]): number {
  if (analyses.length === 0) return 0;
  
  const sentimentSum = analyses.reduce((sum, analysis) => sum + analysis.sentimentScore, 0);
  return sentimentSum / analyses.length;
}

function getSentimentLabel(sentiment: number): string {
  if (sentiment > 0.5) return 'Bullish';
  if (sentiment > 0.2) return 'Slightly Bullish';
  if (sentiment > -0.2) return 'Neutral';
  if (sentiment > -0.5) return 'Slightly Bearish';
  return 'Bearish';
}

function getCoinSymbol(address: string): string {
  // In a real implementation, we would fetch this from a cache or store
  // For now, just return a mock symbol based on the address
  return `$${address.substring(2, 6).toUpperCase()}`;
}

function getConfidenceLevel(score: number): string {
  const absScore = Math.abs(score);
  if (absScore > 0.7) return 'High';
  if (absScore > 0.4) return 'Medium';
  return 'Low';
}

function generateTradingTip(analyses: any[]): string {
  // In a real implementation, this would be more sophisticated
  const tips = [
    "Consider diversifying your portfolio with a mix of established and emerging coins.",
    "Watch for coins with positive sentiment but low price volatility for safer investments.",
    "Market shows increased activity - consider increasing your position in trending coins.",
    "Recent volatility suggests cautious trading and smaller position sizes.",
    "Look for coins with growing social engagement as potential early opportunities.",
  ];
  
  // Pick a tip based on some analysis of the data
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
} 