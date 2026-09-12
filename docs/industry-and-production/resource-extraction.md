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
- **Material-Only Model**: Extractors require no labor (workers) or electrical power grids in Phase 1. They operate continuously once constructed on an available deposit plot.

---

## 2. Mathematical Extraction Formula

During [[simulation-tick-loop|Tick Phase 2]], the quantity of raw material extracted by a facility is computed as:

$$\text{ExtractedQuantity} = \lfloor \text{BaseYield} \times Y_{\text{region}} \times \text{FacilityLevel} \times (1 + \text{TechBonus}) \rfloor$$

Where:
- $\text{BaseYield}$: Intrinsic harvesting speed of the facility type per tick.
- $Y_{\text{region}}$: The regional abundance modifier of the deposit node (e.g. $1.4$ for Verdant Fields grain, $1.5$ for Red Rock Crag iron).
- $\text{FacilityLevel}$: The upgraded tier of the installation ($1, 2, 3, \dots$). Higher levels represent expanded drilling rigs, automated tractors, or deep shaft elevators.
- $\text{TechBonus}$: Corporate technological improvement fraction (default $0.0$, scales with research).

The output item's quality is calculated from the operator's installed equipment (such as harvesters, picks, drill rigs, or tools fitted to the facility) and facility technology:
$$Q_{\text{harvested}} = \min\left(100.0, Q_{\text{equipment}} \times (1 + \text{TechBonus})\right)$$

Where:
- $Q_{\text{equipment}}$: Quality rating of the tools or capital equipment equipped in the extraction facility (e.g. `TOOLS` crafted by a Toolsmith).
- $\text{TechBonus}$: Corporate technological improvement fraction.

---

## 3. Starter Extraction Facilities Directory

| Facility Type    | Required Deposit | Base Yield ($\text{units/tick}$) | Required Equipment             | Primary Outputs |
| ---------------- | ---------------- | -------------------------------- | ------------------------------ | --------------- |
| **Grain Farm**   | `GRAIN`          | $20\text{ units}$                | Agricultural Tools / Harvester | `GRAIN`         |
| **Lumber Camp**  | `TIMBER`         | $15\text{ units}$                | Logging Axes / Saws            | `TIMBER`        |
| **Iron Mine**    | `IRON_ORE`       | $10\text{ units}$                | Mining Picks / Drills          | `IRON_ORE`      |
| **Stone Quarry** | `STONE`          | $15\text{ units}$                | Quarrying Chisels / Saws       | `STONE`         |

> [!NOTE]
> Higher quality equipment produces higher quality raw harvests. If a facility operates without specialized equipment, it utilizes standard baseline starter tools ($Q_{\text{equipment}} = 50.0$).

---

## 4. Plot Capacity Limits

To prevent infinite clustering of facilities on a single resource node:
- Each resource deposit has a maximum number of **Extraction Plots** (e.g., $10$ plots per node).
- Facilities occupy an available plot upon construction without any lease fees; once all plots on a deposit are claimed, no additional facilities can be anchored there.
- As the world matures, unclaimed plots become scarce, driving competition and territorial expansion across other regions of the planet (see [[spatial-graph-model]]).

---

## Related Notes
- [[transformation-chains]] - Processing extracted raw materials into refined products.
- [[quality-system]] - How equipment quality seeds the economic value chain and blends downstream.
- [[starter-province-map]] - Node coordinates and yield values in Oakhaven Basin.
- [[company-management]] - Facility operational costs and balance sheet impacts.
