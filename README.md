# Equity Steaks (Tier-2 Spec)

## One-liner
A collectible + commerce demo where users buy **"equity" in premium steak cuts** (as NFTs), with token-gated drops and a playful “cattle-to-table” progression.

## Core loop (PoC)
1. User connects wallet.
2. App shows a catalog of steak cuts (Ribeye, NY Strip, Filet) as **drop items**.
3. Holding enough $STEAK unlocks:
   - access to drops
   - ability to claim “Cut NFTs” (PoC = off-chain mint / placeholder)
4. Users who don’t hold enough see a buy widget (apps.fun quote → swap).

PoC keeps fulfillment off-chain (no real shipping), but nails the apps.fun primitives: buy + gating + status tiers.

## apps.fun surface used
- `AppsFun.deployAndLaunch("Equity Steaks","STEAK", supply)` (optional)
- `quoteSwapExactETHForTokens` + `swapExactETHForTokens` (buy to unlock)
- `ERC20.balanceOf` (tier gating)

## Tiers
- Tier 0 (< 1 STEAK): browse menu
- Tier 1 (>= 1 STEAK): access weekly drops + “claim” CTA
- Tier 2 (>= 10 STEAK): early access (drop opens 30 min early)
- Tier 3 (>= 100 STEAK): “Rancher” — whitelist for rare cuts + governance votes

## UX screens
- Landing: pitch + connect + “Get STEAK”
- Menu: list of cuts + rarity + next drop timer
- Drop detail: claim button (gated)
- Profile: holdings tier + badges

## Data model (PoC)
Off-chain (JSON/Supabase):
- `Cut`: `{ id, name, rarity, description, imageUrl, dropAt }`
- `Claim`: `{ cutId, wallet, claimedAt }`

## Phase 2 (MVP) options
- Real ERC721 drop contract (claim on-chain)
- Optional real-world fulfillment: shipping address gated behind STEAK tier
- Secondary marketplace + royalties

## Risks / open questions
- Real-world fulfillment adds ops complexity; keep PoC digital.
- Naming: avoid implying securities compliance (“equity”) in serious contexts; this is explicitly a meme/collectible.

## Success criteria
60-second demo:
- connect wallet → fail gate → buy 0.001 ETH worth of STEAK → unlock drop view + claim CTA.
