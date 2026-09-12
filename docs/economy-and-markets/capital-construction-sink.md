---
title: Capital Goods Construction & Upgrade Sink
tags:
  - economy
  - capital
  - construction
  - upgrades
  - sinks
type: specification
status: approved
created: 2026-09-12
---

# Capital Goods Construction & Upgrade Sink

While civilian towns consume food and lifestyle goods, the industrial half of the economy relies on the **Capital Construction Sink**. Erecting new factories and upgrading facility production tiers permanently consumes heavy manufactured materials (`BUILDING_KITS`, `TOOLS`, `BRICKS`, `PLANKS`), establishing organic macro-level demand for heavy metallurgy and construction industries during [[simulation-tick-loop|Tick Phase 6]].

For the supply chains producing these capital goods, see [[metallurgy-construction-chain]] and [[forestry-chain]].
For managing corporate facilities, see [[company-management]].

---

## 1. Founding New Facilities

When a player company commissions a new installation on a settlement plot or natural resource deposit, the project enters a staging state. The company must supply both capital cash and structural materials to commence construction.

### Construction Material Bill of Materials (BOM):

| Facility Category | Sample Installations | Material Requirements | Cash Plot Lease | Construction Duration |
|---|---|---|---|---|
| **Primary Extractor** | `GRAIN_FARM`, `LUMBER_CAMP` | $1\times \text{BUILDING\_KIT} + 4\times \text{TOOLS}$ | $2,000\text{ Cr}$ | $1\text{ tick}$ |
| **Heavy Extractor** | `IRON_MINE`, `STONE_QUARRY` | $2\times \text{BUILDING\_KIT} + 8\times \text{TOOLS}$ | $5,000\text{ Cr}$ | $2\text{ ticks}$ |
| **Basic Processor** | `FLOUR_MILL`, `SAWMILL`, `BRICK_KILN` | $1\times \text{BUILDING\_KIT} + 4\times \text{TOOLS}$ | $3,000\text{ Cr}$ | $1\text{ tick}$ |
| **Heavy Smelter** | `SMELTER` | $2\times \text{BUILDING\_KIT} + 6\times \text{TOOLS}$ | $6,000\text{ Cr}$ | $2\text{ ticks}$ |
| **Assembly Works** | `TOOLSMITH`, `CONSTRUCTION_YARD` | $3\times \text{BUILDING\_KIT} + 10\times \text{TOOLS}$ | $8,000\text{ Cr}$ | $3\text{ ticks}$ |

Materials can be delivered directly from the player's own warehouses or automatically purchased from the nearest [[spot-exchange-orderbooks|Trade Hub]]. Once materials are committed, they are permanently consumed.

---

## 2. Facility Upgrade Mechanics

Upgrading an existing facility from Level $L$ to Level $L + 1$ expands its batch processing throughput proportionally (Level 2 processes 2 batches per tick; Level 5 processes 5 batches per tick).

### Upgrade Scaling Formulas:
For an upgrade from Level $L \to L+1$:

$$\text{ToolsRequired}(L) = \lfloor 2 \times L \rfloor$$

$$\text{BricksRequired}(L) = \lfloor 4 \times L \rfloor$$

$$\text{PlanksRequired}(L) = \lfloor 4 \times L \rfloor$$

$$\text{CashCost}(L) = \lfloor 500 \times L^{1.25} \rfloor\text{ Credits}$$

### Material Consumption Table:

| Current Level $\to$ Target Level | Tools Needed | Bricks Needed | Planks Needed | Cash Investment | Resulting Throughput |
|---|---|---|---|---|---|
| **Level 1 $\to$ Level 2** | $2\times \text{Tools}$ | $4\times \text{Bricks}$ | $4\times \text{Planks}$ | $500\text{ Cr}$ | $2\times$ Base Batches |
| **Level 2 $\to$ Level 3** | $4\times \text{Tools}$ | $8\times \text{Bricks}$ | $8\times \text{Planks}$ | $1,189\text{ Cr}$ | $3\times$ Base Batches |
| **Level 3 $\to$ Level 4** | $6\times \text{Tools}$ | $12\times \text{Bricks}$ | $12\times \text{Planks}$ | $1,974\text{ Cr}$ | $4\times$ Base Batches |
| **Level 4 $\to$ Level 5** | $8\times \text{Tools}$ | $16\times \text{Bricks}$ | $16\times \text{Planks}$ | $2,836\text{ Cr}$ | $5\times$ Base Batches |

---

## 3. Macroeconomic Circulation

The capital construction sink creates a self-reinforcing economic growth loop:

```mermaid
graph LR
    P[Profitable Companies] -->|Reinvest Profits| U[Upgrade Facilities & Build New Plants]
    U -->|Material Demand| C[Consume Kits, Tools, Bricks & Planks]
    C -->|High Margins & Cash Flow| H[Heavy Mining & Smelting Producers]
    H -->|Higher Incomes| M[More Economic Expansion]
```

When many players enter the game or expand their industrial empires, raw construction materials experience high price spikes on [[spot-exchange-orderbooks|Trade Hubs]], making heavy industry exceptionally lucrative.

---

## Related Notes
- [[metallurgy-construction-chain]] - Production of Tools and Building Kits.
- [[forestry-chain]] - Sourcing Planks for construction.
- [[company-management]] - Facility portfolio management and balance sheet assets.
- [[simulation-tick-loop]] - Construction resolution in Tick Phase 6.
