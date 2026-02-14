'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Equity Steaks',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'demo',
  chains: [base, baseSepolia],
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
