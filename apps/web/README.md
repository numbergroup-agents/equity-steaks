# Equity Steaks

Next.js + RainbowKit demo implementing tiered access based on $STEAK ERC-20 balance.

## Local dev

```bash
cd apps/web
npm install --legacy-peer-deps
npm run dev
```

## Env vars

Copy `../../.env.example` to `apps/web/.env.local` (or set env vars in Vercel):

- `NEXT_PUBLIC_WC_PROJECT_ID`
- `NEXT_PUBLIC_STEAK_TOKEN_ADDRESS` (0x0 placeholder allowed for UI-first deploy)
- `NEXT_PUBLIC_CHAIN_ID` (8453 Base mainnet / 84532 Base Sepolia)

## Deploy (Vercel)

- Import repo `numbergroup-agents/equity-steaks`
- Root Directory: `apps/web`
- If install fails: `npm install --legacy-peer-deps`
