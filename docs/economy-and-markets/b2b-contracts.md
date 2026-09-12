---
title: B2B Long-Term Supply Contracts
tags:
  - economy
  - contracts
  - b2b
  - supply-chain
  - logistics
type: specification
status: approved
created: 2026-09-12
---

# B2B Long-Term Supply Contracts

While [[spot-exchange-orderbooks|Spot Markets]] handle immediate commodity liquidity, **B2B Recurring Supply Contracts** form the foundation of automated, predictable industrial supply chains. Contracts allow players to establish recurring tick-by-tick shipments between specific facilities at agreed-upon prices and quality SLAs.

Contracts execute automatically during [[simulation-tick-loop|Tick Phase 1]], prioritizing established supply pipelines before open market trading commences.

---

## 1. Contract Structure & Data Schema

```typescript
export interface B2BContract {
  id: string;
  sellerCompanyId: string;
  buyerCompanyId: string;
  sourceFacilityId: string;     // Supplier warehouse
  destFacilityId: string;       // Consumer factory warehouse
  itemType: string;             // e.g. "TIMBER", "IRON_INGOT"
  quantityPerTick: number;      // e.g. 10 units / tick
  unitPrice: number;            // Fixed price per unit in Credits
  minQuality: number;           // SLA: shipments below this quality are rejected
  freightTerms: 'FOB_ORIGIN' | 'FOB_DESTINATION'; // Who pays delivery fee
  startTick: number;
  durationTicks: number;        // e.g. 1440 ticks (24 hours)
  consecutiveBreaches: number;  // Tracks failures to deliver or pay
  maxAllowedBreaches: number;   // Auto-cancellation threshold (default: 3)
  penaltyFeeOnBreach: number;   // Liquidated damages paid upon failure
  status: 'ACTIVE' | 'FULFILLED' | 'CANCELLED_BREACH' | 'CANCELLED_MUTUAL';
}
```

---

## 2. Phase 1 Execution Workflow

During [[simulation-tick-loop|Tick Phase 1]]:

```mermaid
graph TD
    Start([Phase 1 Tick Begins]) --> Query[Query all ACTIVE B2B Contracts]
    Query --> CheckStock{Seller stock >= QtyPerTick<br>AND Quality >= MinQuality?}
    
    CheckStock -- Yes --> CheckFunds{Buyer cash >= TotalCost<br>(Goods + Freight if FOB_ORIGIN)?}
    CheckStock -- No --> BreachSeller[Increment Breach Counter<br>Levy Seller Penalty Fee]
    
    CheckFunds -- Yes --> Transfer[Transfer Items to Buyer Facility<br>Transfer Cash to Seller<br>Deduct Freight Fee via Distance Graph]
    CheckFunds -- No --> BreachBuyer[Increment Breach Counter<br>Levy Buyer Penalty Fee]

    Transfer --> ResetBreach[Reset Consecutive Breaches to 0]
    BreachSeller --> CheckLimit{Breaches > MaxAllowed?}
    BreachBuyer --> CheckLimit
    CheckLimit -- Yes --> Terminate[Set Status = CANCELLED_BREACH]
    CheckLimit -- No --> NextContract[Process Next Contract]
    ResetBreach --> NextContract
```

---

## 3. Freight Terms & Delivery Mechanics

Because deliveries resolve instantly with distance fees (see [[delivery-and-freight]]), the contract explicitly assigns shipping liability:
- **FOB Destination (Delivered)**: The **Seller** covers the freight cost from their facility to the buyer's destination. The buyer pays only $(\text{Qty} \times \text{UnitPrice})$.
- **FOB Origin (Ex-Works)**: The **Buyer** covers the freight cost from the seller's facility to their own factory.

Since freight fees are calculated via shortest-path distance $D[u, v]$, long-distance B2B contracts impose substantial recurring logistics overhead. Players are incentivized to seek local suppliers within their immediate province (see [[starter-province-map]]).

---

## 4. Economic Advantages of B2B Contracts

| Aspect | Spot Exchange Order Books | B2B Recurring Contracts |
|---|---|---|
| **Price Stability** | Volatile; fluctuates with hourly market supply/demand. | Locked; guaranteed unit price for the duration of the agreement. |
| **Transaction Fees** | $2.0\%$ hub exchange fee per trade. | **$0.0\%$ exchange fee** (direct peer-to-peer settlement). |
| **Quality Guarantee** | Best-effort; depends on resting order lots. | Strict SLA; automatic rejection if quality dips below $Q_{\text{min}}$. |
| **Automation** | Requires placing new orders or managing limit orders. | **Zero manual overhead**; executes every tick automatically. |

---

## Related Notes
- [[spot-exchange-orderbooks]] - Public marketplace alternative.
- [[delivery-and-freight]] - How distance shipping fees are computed.
- [[transformation-chains]] - Ensuring steady input supplies for factories.
- [[simulation-tick-loop]] - Priority execution in Tick Phase 1.
