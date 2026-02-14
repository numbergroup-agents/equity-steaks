'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSteakTier } from '@/hooks/useSteakTier';

const cuts = [
  {
    id: 'ribeye',
    name: 'Ribeye',
    rarity: 'Prime',
    description: 'Marbled. Loud. The default flex.',
  },
  {
    id: 'ny-strip',
    name: 'NY Strip',
    rarity: 'Choice',
    description: 'Classic. Clean edges. Wall Street energy.',
  },
  {
    id: 'filet',
    name: 'Filet',
    rarity: 'Legendary',
    description: 'Soft-spoken but expensive. Rancher-only vibes.',
  },
];

function tierName(tier: number) {
  return tier === 0
    ? 'Browser'
    : tier === 1
      ? 'Diner'
      : tier === 2
        ? 'Early Access'
        : 'Rancher';
}

export default function Home() {
  const { isConnected, isConfigured, tier, balance } = useSteakTier();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Equity Steaks 🥩</h1>
            <p className="text-xs text-zinc-400">Tier-gated drops for premium cuts</p>
          </div>
          <ConnectButton />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {!isConfigured && (
          <div className="mb-6 rounded-xl border border-yellow-600 bg-yellow-950/40 p-4 text-yellow-100">
            <p className="font-semibold">Token not configured</p>
            <p className="text-sm opacity-90">
              Set <code className="font-mono">NEXT_PUBLIC_STEAK_TOKEN_ADDRESS</code> to enable tier gating.
              UI is deployable now; on-chain gating activates later.
            </p>
          </div>
        )}

        <div className="mb-8 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Your status</h2>
            <span className="text-sm text-zinc-400">
              {isConnected ? `Tier ${tier} — ${tierName(tier)}` : 'Not connected'}
            </span>
          </div>
          {isConnected && isConfigured && (
            <p className="text-sm text-zinc-300">Balance: {balance.toFixed(4)} STEAK</p>
          )}
          {!isConnected && (
            <p className="text-sm text-zinc-300">
              Connect to check your $STEAK balance and unlock drops.
            </p>
          )}
        </div>

        <section className="grid gap-4">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">Weekly drops</h2>
            <p className="text-sm text-zinc-400">Tier 1+ can claim (PoC = off-chain)</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {cuts.map((c) => (
              <div key={c.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
                <p className="text-xs text-zinc-400">{c.rarity}</p>
                <h3 className="mt-1 text-lg font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-zinc-300">{c.description}</p>
                <button
                  className="mt-4 w-full rounded-xl bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={!isConnected || tier < 1}
                  onClick={() => alert('PoC: claim recorded off-chain (not implemented yet).')}
                >
                  {tier >= 1 ? 'Claim Cut' : 'Hold 1+ STEAK to claim'}
                </button>
                {tier >= 2 && (
                  <p className="mt-3 text-xs text-emerald-400">Early access active (Tier 2+)</p>
                )}
                {tier >= 3 && (
                  <p className="mt-1 text-xs text-fuchsia-400">Rancher perks active (Tier 3)</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
          <h2 className="text-lg font-semibold">Buy STEAK</h2>
          <p className="mt-1 text-sm text-zinc-400">
            PoC: wire this to apps.fun quote+swap once token is deployed.
          </p>
          <button
            className="mt-4 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
            onClick={() => alert('PoC: apps.fun buy widget not wired yet.')}
          >
            Get STEAK
          </button>
        </section>
      </main>
    </div>
  );
}
