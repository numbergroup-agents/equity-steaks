'use client';

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi } from '@/lib/erc20';

const ZERO = '0x0000000000000000000000000000000000000000';

export function useSteakTier() {
  const { address, isConnected } = useAccount();
  const tokenAddress = (process.env.NEXT_PUBLIC_STEAK_TOKEN_ADDRESS || ZERO) as `0x${string}`;

  const isConfigured = tokenAddress !== ZERO;

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    query: { enabled: isConfigured },
  });

  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: isConfigured && !!address },
  });

  const formatted = balance && decimals ? Number(balance) / 10 ** decimals : 0;
  const tier = formatted >= 100 ? 3 : formatted >= 10 ? 2 : formatted >= 1 ? 1 : 0;

  return {
    isConnected,
    isConfigured,
    tokenAddress,
    balance: formatted,
    tier,
  };
}
