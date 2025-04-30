import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { base, baseSepolia } from 'wagmi/chains';
import { ReactNode } from 'react';

// Get environment variables
const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || '';
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';

const projectId = process.env.REACT_APP_PROJECT_ID || "453f2a8e1d89bc35b8bc49eb781167b9";
// Configure wagmi client
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    walletConnectProjectId: projectId,

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