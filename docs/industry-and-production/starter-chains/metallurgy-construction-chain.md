---
title: Metallurgy & Construction Supply Chain (Capital Sector)
tags:
  - industry
  - supply-chain
  - metallurgy
  - construction
  - capital-goods
  - oakhaven
type: specification
status: approved
created: 2026-09-12
---

# Metallurgy & Construction Supply Chain (Capital Sector)

The **Metallurgy & Construction Supply Chain** constitutes the heavy industrial backbone of the economy. It transforms extracted ores and stone into refined structural materials, tools, and modular building assemblies required to erect new facilities and upgrade existing infrastructure across the world.

For facility construction costs and requirements, see [[capital-construction-sink]].
For quality blending math on multi-input recipes, see [[quality-system]].

---

## 1. Supply Chain Architecture

```mermaid
graph TD
    RRC[(Red Rock Crag<br>Iron: 1.5x | Stone: 1.2x)] -->|Mining| IM[Iron Mine<br>Yield: 15 Ore/tick]
    RRC -->|Quarrying| SQ[Stone Quarry<br>Yield: 18 Stone/tick]

    IM -->|2 Iron Ore| SM[Smelter<br>Produces: 1 Iron Ingot]
    SQ -->|2 Stone| BK[Brick Kiln<br>Produces: 2 Bricks]

    SM -->|1 Iron Ingot| TS[Toolsmith]
    PL1[Planks from Forestry] -->|1 Plank| TS
    TS -->|Produces: 2 Tools| Sink1[Capital Sink: Facility Upgrades]

    SM -->|2 Iron Ingots| CY[Construction Yard]
    BK -->|4 Bricks| CY
    PL2[Planks from Forestry] -->|4 Planks| CY
    CY -->|Produces: 1 Building Kit| Sink2[Capital Sink: New Facility Construction]
```

---

## 2. Tier Details & Recipes

### Tier 1: Extraction at Red Rock Crag
- **Iron Mine (`IRON_MINE`)**:
  - Deposit Yield: Base $10 \times 1.5\text{ (Red Rock Crag)} = \mathbf{15\text{ units of Iron Ore/tick}}$.
  - Unit Cargo Weight: $100\text{ kg/unit}$ (very heavy bulk material).
- **Stone Quarry (`STONE_QUARRY`)**:
  - Deposit Yield: Base $15 \times 1.2\text{ (Red Rock Crag)} = \mathbf{18\text{ units of Stone/tick}}$.
  - Unit Cargo Weight: $100\text{ kg/unit}$.

### Tier 2: Basic Smelting & Masonry
- **Smelter (`SMELTER`)**:
  - Inputs: $2\times \text{IRON\_ORE}$ ($w_1 = 1.0$).
  - Outputs: $1\times \text{IRON\_INGOT}$.
  - Unit Cargo Weight: $60\text{ kg/unit}$.
- **Brick Kiln (`BRICK_KILN`)**:
  - Inputs: $2\times \text{STONE}$ ($w_1 = 1.0$).
  - Outputs: $2\times \text{BRICKS}$.
  - Unit Cargo Weight: $60\text{ kg/unit}$.

### Tier 3: Tools & Heavy Hardware
- **Toolsmith (`TOOLSMITH`)**:
  - Inputs: $1\times \text{IRON\_INGOT}$ ($w_1 = 0.6$) $+ 1\times \text{PLANK}$ ($w_2 = 0.4$).
  - Outputs: $2\times \text{TOOLS}$.
  - Unit Cargo Weight: $20\text{ kg/unit}$.

### Tier 4: Modular Assembly (Capital Good)
- **Construction Yard (`CONSTRUCTION_YARD`)**:
  - Inputs: $2\times \text{IRON\_INGOT}$ ($w_1 = 0.4$) $+ 4\times \text{BRICKS}$ ($w_2 = 0.3$) $+ 4\times \text{PLANKS}$ ($w_3 = 0.3$).
  - Outputs: $1\times \text{BUILDING\_KIT}$.
  - Unit Cargo Weight: $150\text{ kg/unit}$.

---

## 3. The Capital Growth Engine

Unlike consumer goods (Bread and Furniture) which are consumed by towns and vanish from the physical economy, `TOOLS` and `BUILDING_KITS` are invested directly into industrial expansion:
- **Founding a New Facility**: Requires $1\times \text{BUILDING\_KIT} + 5\times \text{TOOLS} + \text{Cash Lease}$ (see [[capital-construction-sink]]).
- **Upgrading Facility Level**: Upgrading any factory from Level $L \to L+1$ requires Tools and structural materials.
- **Economic Ripple Effect**: When player companies expand rapidly, demand for Tools and Building Kits surges, driving up the price of Iron Ore, Stone, and Planks across the entire province.

---

## Related Notes
- [[capital-construction-sink]] - Material requirements for building new installations.
- [[quality-system]] - Multi-input blending math for Tools and Building Kits.
- [[forestry-chain]] - Sourcing Planks for Toolsmiths and Construction Yards.
- [[starter-province-map]] - Red Rock Crag deposit coordinates and Ironridge facilities.
