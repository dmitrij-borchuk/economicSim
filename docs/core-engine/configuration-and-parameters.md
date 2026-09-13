---
title: Configuration & Global Engine Parameters
tags:
  - core-engine
  - configuration
  - tuning
  - parameters
type: specification
status: approved
created: 2026-09-12
---

# Configuration & Global Engine Parameters

This document defines the systemic constants, scaling factors, and runtime configuration options governing the economic simulator. All numeric values are loaded at server initialization and can be hot-reloaded or adjusted per universe instance.

For execution lifecycle details, refer to [[simulation-tick-loop]].

---

## 1. Runtime Configuration Schema

Below is the canonical TypeScript configuration interface loaded by the simulation server:

```typescript
export interface EngineConfig {
  /** Core simulation pacing */
  tick: {
    durationSeconds: number;        // Default: 60 (1 minute)
    maxExecutionTimeMs: number;     // Alert threshold (e.g. 5000ms)
    autoCatchupBehindSchedule: boolean;
  };

  /** Spatial & logistics settings */
  logistics: {
    baseFreightRatePerKmPerKg: number; // Cost in credits per km per kg
    defaultUnitWeightKg: number;       // Default weight for items unless overridden
    minimumDeliveryFee: number;        // Minimum transaction delivery fee
  };

  /** Quality system constants */
  quality: {
    minQuality: number;               // 1
    maxQuality: number;               // 100
    defaultEquipmentQuality: number;  // 50 (baseline starter equipment)
    techBonusPerLevel: number;        // e.g. 0.05 (+5% per tech tier)
  };

  /** Market & trading parameters */
  market: {
    hubTransactionFeeRate: number;  // Default: 0.02 (2% of gross trade value)
    orderExpiryTicks: number;       // Default: 1440 (24 hours in 1m ticks)
    maxRestingOrdersPerCompany: number;
  };

  /** Population & consumption sinks */
  consumption: {
    utilityQualityExponent: number; // alpha: 0.6
    utilityPriceExponent: number;   // beta: 0.9
    basePerCapitaDailyFoodUnits: number;
    basePerCapitaDailyFurnitureUnits: number;
  };

  /** Player starter parameters */
  starter: {
    initialCashCredits: number;     // Default: 25000
    starterFacilityLevel: number;   // Default: 1
  };
}
```

---

## 2. Parameter Tuning Matrix

| Parameter Group | Key Variable | Default Value | Tuning Impact | Related Specification |
|---|---|---|---|---|
| **Tick Cadence** | `tick.durationSeconds` | `60s` | Determines simulation pace; shorter intervals favor active play, longer intervals favor casual 24/7 persistent play. | [[simulation-tick-loop]] |
| **Logistics** | `baseFreightRatePerKmPerKg` | `0.005 Cr` | Higher values penalize distant trade and enforce localized regional economies; lower values globalize the market quickly. | [[delivery-and-freight]] |
| **Logistics** | `minimumDeliveryFee` | `10.0 Cr` | Discourages micro-transactions that clog logistics channels. | [[delivery-and-freight]] |
| **Quality** | `quality.minQuality` | `1.0` | Lower bound for all goods. | [[quality-system]] |
| **Quality** | `quality.maxQuality` | `100.0` | Maximum quality attainable through high-purity inputs and top-tier facility tech. | [[quality-system]] |
| **Exchange** | `hubTransactionFeeRate` | `0.02` (2%) | Acts as a global monetary sink, removing excess liquidity from high-volume trading. | [[spot-exchange-orderbooks]] |
| **Retail Utility** | $\alpha$ (`utilityQualityExponent`) | `0.6` | Consumer sensitivity to item quality. | [[settlement-consumer-demand]] |
| **Retail Utility** | $\beta$ (`utilityPriceExponent`) | `0.9` | Consumer price sensitivity / price elasticity. | [[settlement-consumer-demand]] |
| **Starter** | `starter.initialCashCredits` | `25,000 Cr` | Starting operating capital allocated upon company registration. | [[onboarding-and-licenses]] |

---

## 3. Environment Variable Overrides

Any parameter in `EngineConfig` can be overridden via environment variables or a `.env` file at server startup:

```bash
# Example Server Environment Config
SIM_TICK_DURATION_SECONDS=60
SIM_LOGISTICS_BASE_FREIGHT=0.005
SIM_MARKET_FEE_RATE=0.02
SIM_STARTER_CASH=25000
```

---

## Related Notes
- [[simulation-tick-loop]] - How the tick runner executes these values.
- [[quality-system]] - Quality formulas and bounds.
- [[delivery-and-freight]] - Spatial freight distance cost application.
- [[spot-exchange-orderbooks]] - Market fee deductions.
