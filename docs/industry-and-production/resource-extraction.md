---
title: Resource Extraction & Harvesting
tags:
  - industry
  - extraction
  - resources
  - gathering
type: specification
status: approved
created: 2026-09-12
---

# Resource Extraction & Harvesting

Resource extraction represents the primary supply generation layer of the economy. Extraction facilities gather raw commodities directly from natural deposit nodes across the spatial graph during [[simulation-tick-loop|Tick Phase 2]].

For downstream processing of these raw commodities, see [[transformation-chains]].
For the deposit locations and yield factors in the starter world, see [[starter-province-map]].

---

## 1. Extraction Mechanics & Phase 1 Scope

In Phase 1 of the simulation:
- **Infinite Reserves**: Resource deposit nodes possess unlimited total reserves. Deposits do not deplete or exhaust, ensuring stable early-game industrial cycles.
- **Regional Specialization**: Resource nodes feature region-specific yield multipliers ($Y_{\text{region}}$). A rich iron vein produces 50% more ore per tick than an ordinary node, incentivizing players to establish operations in strategically advantageous locations.
- **Material-Only Model**: Extractors require no labor (workers) or electrical power grids in Phase 1. They operate continuously as long as the owning company pays the per-tick maintenance and land lease fee.

---

## 2. Mathematical Extraction Formula

During [[simulation-tick-loop|Tick Phase 2]], the quantity of raw material extracted by a facility is computed as:

$$\text{ExtractedQuantity} = \lfloor \text{BaseYield} \times Y_{\text{region}} \times \text{FacilityLevel} \times (1 + \text{TechBonus}) \rfloor$$

Where:
- $\text{BaseYield}$: Intrinsic harvesting speed of the facility type per tick.
- $Y_{\text{region}}$: The regional abundance modifier of the deposit node (e.g. $1.4$ for Verdant Fields grain, $1.5$ for Red Rock Crag iron).
- $\text{FacilityLevel}$: The upgraded tier of the installation ($1, 2, 3, \dots$). Higher levels represent expanded drilling rigs, automated tractors, or deep shaft elevators.
- $\text{TechBonus}$: Corporate technological improvement fraction (default $0.0$, scales with research).

The output item is generated with the intrinsic natural quality of the deposit node:
$$Q_{\text{harvested}} = Q_{\text{deposit}}$$

---

## 3. Starter Extraction Facilities Directory

| Facility Type | Required Deposit | Base Yield ($\text{units/tick}$) | Deposit Quality ($Q$) | Base Maintenance | Primary Outputs |
|---|---|---|---|---|---|
| **Grain Farm** | `GRAIN` | $20\text{ units}$ | $Q = 55$ | $25\text{ Cr/tick}$ | `GRAIN` |
| **Lumber Camp** | `TIMBER` | $15\text{ units}$ | $Q = 50$ | $20\text{ Cr/tick}$ | `TIMBER` |
| **Iron Mine** | `IRON_ORE` | $10\text{ units}$ | $Q = 60$ | $40\text{ Cr/tick}$ | `IRON_ORE` |
| **Stone Quarry** | `STONE` | $15\text{ units}$ | $Q = 50$ | $25\text{ Cr/tick}$ | `STONE` |

---

## 4. Plot Leasing & Capacity Limits

To prevent infinite clustering of facilities on a single resource node:
- Each resource deposit has a maximum number of **Extraction Plots** (e.g., $10$ plots per node).
- A player must pay a one-time plot lease fee or an ongoing municipal land lease ($10\text{ Cr/tick}$) to anchor a facility.
- As the world matures, unclaimed plots become scarce, driving competition and territorial expansion across other regions of the planet (see [[spatial-graph-model]]).

---

## Related Notes
- [[transformation-chains]] - Processing extracted raw materials into refined products.
- [[quality-system]] - How deposit quality impacts downstream manufacturing.
- [[starter-province-map]] - Node coordinates and yield values in Oakhaven Basin.
- [[company-management]] - Facility operational costs and balance sheet impacts.
