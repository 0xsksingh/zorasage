import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base, baseSepolia } from 'wagmi/chains';
import { ReactNode } from 'react';

// Get environment variables
const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || '';
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

// Configure wagmi client
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: alchemyKey,
    walletConnectProjectId: walletConnectId,

    // Required
    appName: "ZoraSage",
    appDescription: "AI-Powered Trading & Creation Suite for Zora Coins",
    appUrl: "https://zorasage.app",
    appIcon: "https://zorasage.app/icon.png",

    // Configure chains
    chains: [base, baseSepolia],
  }),
);

export const Web3Providers = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}; 