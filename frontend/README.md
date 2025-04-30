# ZoraSage Frontend

This is the frontend application for ZoraSage, an AI-powered trading and creation suite for Zora Coins.

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- shadcn/ui
- Zora Coins SDK
- TensorFlow.js
- Wagmi & ConnectKit

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the frontend directory and add the required environment variables (see `env.example`).

### Development

Run the development server:

   ```
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - Reusable UI components
- `/lib` - Utility functions, hooks, and services
  - `/lib/zora.ts` - Zora Coins SDK integration
  - `/lib/store.ts` - Global state using Zustand
  - `/lib/web3` - Web3 providers and utilities
- `/styles` - Global CSS and TailwindCSS configuration
- `/types` - TypeScript type definitions

## Features

- **Dashboard** - Overview of market trends, portfolio, and AI insights
- **Market Analysis** - AI-powered analysis of Zora coins
- **Portfolio Management** - View and manage your coin holdings
- **Trading Strategies** - Create and execute AI-assisted trading strategies
- **Trend Analysis** - Visualize and track market trends
- **Social Sentiment** - NLP analysis of social sentiment around coins

## Learn More

- [Zora Coins SDK Documentation](https://docs.zora.co/coins/sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
