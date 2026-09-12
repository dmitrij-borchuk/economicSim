---
title: Settlement Retail Demand & Population Sinks
tags:
  - economy
  - demand
  - retail
  - population
  - consumption
  - sinks
type: specification
status: approved
created: 2026-09-12
---

# Settlement Retail Demand & Population Sinks

Settlement populations represent the vital civilian consumption sink of the economic simulation. Towns and cities consume finished goods each tick, permanently removing products from the physical inventory and injecting fresh monetary liquidity back into player companies during [[simulation-tick-loop|Tick Phase 5]].

For the list of settlements in the starter world, see [[starter-province-map]].
For the products consumed by civilians, see [[agriculture-chain]] (`BREAD`) and [[forestry-chain]] (`FURNITURE`).

---

## 1. Demographic Demand Formulation

Every settlement node $V_s$ possesses two demographic attributes:
1. **Population ($N_{\text{pop}}$)**: Absolute civilian head count.
2. **Wealth Index ($W_{\text{index}} \in [0.5, 2.5]$)**: Purchasing power and standard of living.

### Per-Tick Demand Quantity:
During [[simulation-tick-loop|Tick Phase 5]], the municipal purchasing agency computes the target consumption units for each consumer commodity:

$$\text{TargetUnits}(\text{Item}) = \left\lfloor N_{\text{pop}} \times C_{\text{per\_capita}}(\text{Item}) \times W_{\text{index}} \right\rfloor$$

### Starter Commodities Matrix:

| Commodity | Consumer Need Tier | Base Daily per Capita ($C$) | Price Elasticity | Quality Preference |
|---|---|---|---|---|
| `BREAD` | **Essential Nutrition** | $0.002\text{ units/citizen}$ | Inelastic ($\beta = 0.6$) | Tolerant ($Q \ge 25$) |
| `FURNITURE`| **Civilian Comfort** | $0.0005\text{ units/citizen}$ | Elastic ($\beta = 1.1$) | High Quality ($Q \ge 50$) |

### Example for Starter Settlements:
- **Port Oakhaven** ($25,000\text{ Pop}$, Wealth $1.2$):
  - Bread Target $= 25,000 \times 0.002 \times 1.2 = \mathbf{60\text{ units of Bread / tick}}$.
  - Furniture Target $= 25,000 \times 0.0005 \times 1.2 = \mathbf{15\text{ units of Furniture / tick}}$.
- **Millbrook** ($8,000\text{ Pop}$, Wealth $0.9$):
  - Bread Target $= 8,000 \times 0.002 \times 0.9 = \mathbf{14.4 \to 14\text{ units of Bread / tick}}$.

---

## 2. Municipal Purchasing Agent & Utility Function

Civilian populations do not purchase randomly. Instead, the settlement's municipal purchasing agent evaluates all active sell orders resting on the local [[spot-exchange-orderbooks|Trade Hub Order Book]] for that commodity.

Each available sell lot is scored using the **Consumer Utility Function**:

$$U(Q, P) = \frac{Q^{\alpha}}{P^{\beta}}$$

Where:
- $Q$: Quality rating of the offered lot ($1.0 - 100.0$, from [[quality-system]]).
- $P$: Unit price requested by the seller in Credits.
- $\alpha$: Quality preference exponent (default $0.6$, see [[configuration-and-parameters]]).
- $\beta$: Price sensitivity exponent (default $0.9$).

### Purchase Execution:
1. The purchasing agent ranks all resting sell orders by **Utility $U$ (Descending)**.
2. Orders with the highest utility are purchased first until the town's target quantity or per-tick budget is exhausted.
3. The seller receives immediate payment, goods are absorbed into the populace, and the transaction is recorded on the regional economic ledger.

---

## 3. The Quality vs. Price Trade-Off

The utility function creates healthy economic tension between budget mass-production and boutique artisanal manufacturing:

| Supplier Strategy | Price ($P$) | Quality ($Q$) | Utility Score $U = \frac{Q^{0.6}}{P^{0.9}}$ | Purchasing Priority |
|---|---|---|---|---|
| **Cheap Mass Bread** | $2.5\text{ Cr}$ | $30.0$ | $\frac{30^{0.6}}{2.5^{0.9}} = \frac{7.70}{2.28} = \mathbf{3.38}$ | **High Priority** (Economical) |
| **Average Bread** | $4.0\text{ Cr}$ | $50.0$ | $\frac{50^{0.6}}{4.0^{0.9}} = \frac{10.45}{3.48} = \mathbf{3.00}$ | Standard Priority |
| **Overpriced Low Quality** | $5.0\text{ Cr}$ | $25.0$ | $\frac{25^{0.6}}{5.0^{0.9}} = \frac{6.90}{4.26} = \mathbf{1.62}$ | Lowest Priority (Will sit unsold) |
| **Artisanal Masterwork Bread** | $6.5\text{ Cr}$ | $90.0$ | $\frac{90^{0.6}}{6.5^{0.9}} = \frac{14.80}{5.39} = \mathbf{2.75}$ | Sold to Wealthy Outposts |

---

## 4. Town Prosperity & Dynamic Growth Feedback

When a settlement consistently satisfies $100\%$ of its civilian demand with high-quality goods ($Q > 60$):
- **Population Growth**: Civilian head count increases by $+0.05\%$ per tick.
- **Wealth Accumulation**: Wealth index $W_{\text{index}}$ climbs, expanding the town's consumption budget.
- **Under-supply Crisis**: If bread or basic goods are unavailable for consecutive ticks, population migrates away and town tax revenue declines, creating clear player opportunities to step in and capture high-margin monopoly pricing.

---

## Related Notes
- [[spot-exchange-orderbooks]] - Where town purchasing agents procure supplies.
- [[agriculture-chain]] - Bread production for town survival.
- [[forestry-chain]] - Furniture production for civilian comfort.
- [[capital-construction-sink]] - The complementary capital goods sink.
