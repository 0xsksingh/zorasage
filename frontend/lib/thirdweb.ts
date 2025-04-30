import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";
import {  ThirdwebProvider } from "thirdweb/react";

// Define the client ID (get this from thirdweb dashboard)
export const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "";

// Create the client instance
export const client = createThirdwebClient({
  clientId,
  // You can add more configurations here
});

// Export supported chains
export const supportedChains = [base];

// Helper to determine if we're on testnet or mainnet
export const getActiveChain = (chainId?: number) => {
  if (!chainId) return base;
  
  return base;
}; 