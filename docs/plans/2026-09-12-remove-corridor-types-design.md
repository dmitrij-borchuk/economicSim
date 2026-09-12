---
title: Design - Remove Corridor Types from Spatial Graph Model
date: 2026-09-12
status: approved
type: design
---

# Design: Remove Corridor Types from Spatial Graph Model

## 1. Context & Motivation

In the initial spatial design, edges in the world graph $G = (V, E)$ included a categorical `Corridor Type` (`DIRT_ROAD`, `PAVED_HIGHWAY`, `RAIL_CORRIDOR`, `COASTAL_SEALANE`) paired with a transit multiplier $C_{\text{terrain}}$, generating an effective distance metric:

$$d_{\text{eff}}(u, v) = d_{u,v} \times C_{\text{terrain}}$$

This added unnecessary computational overhead and cognitive complexity for Phase 1. To keep the simulation lean, transparent, and focused on core economic loops, corridor types and terrain multipliers are removed. Graph edges will store a single scalar weight: direct physical distance $d_{u,v}$ in kilometers ($\text{km}$).

## 2. Approved Design

### 2.1 Spatial Graph Model (`docs/geography/spatial-graph-model.md`)
- **Topological Diagram**:
  - Update sample Mermaid graph edge labels to display pure distances (e.g. `35km`, `60km`) instead of type prefixes like `Road: 35km` or `Coastal: 60km`.
- **Edge Specification ($E$)**:
  - Eliminate the `Corridor Type` enum (`DIRT_ROAD`, `PAVED_HIGHWAY`, `RAIL_CORRIDOR`, `COASTAL_SEALANE`) and the terrain multiplier ($C_{\text{terrain}}$).
  - Eliminate the `Effective Distance Metric` formula ($d_{\text{eff}}$).
  - Define each edge $e = (u, v) \in E$ strictly with **Distance ($d_{u,v}$)** in kilometers ($\text{km}$), which acts as the direct scalar weight $w(e) = d_{u,v}$.
- **Shortest Path Computation**:
  - Update the all-pairs shortest path formula from effective distance to direct physical distance:
    $$D[u, v] = \min_{p \in \mathcal{P}(u, v)} \sum_{e \in p} d(e)$$

### 2.2 Starter Province Map (`docs/geography/starter-province-map.md`)
- **Corridor & Distance Matrix**:
  - Simplify the 6-column matrix to a clean 3-column table:
    | Origin Node ($u$) | Destination Node ($v$) | Distance ($d$) |
    |---|---|---|
    | `node_port_oakhaven` | `node_millbrook` | $30\text{ km}$ |
    | `node_millbrook` | `node_verdant_fields` | $15\text{ km}$ |
    | `node_port_oakhaven` | `node_ironridge` | $45\text{ km}$ |
    | `node_ironridge` | `node_red_rock_crag` | $12\text{ km}$ |
    | `node_port_oakhaven` | `node_pinewood` | $35\text{ km}$ |
    | `node_pinewood` | `node_whispering_pines` | $10\text{ km}$ |
    | `node_millbrook` | `node_pinewood` | $40\text{ km}$ |
    | `node_ironridge` | `node_millbrook` | $55\text{ km}$ |
- **Strategic Geographic Dynamics**:
  - Revise the strategic dynamics narrative to reflect pure physical distances:
    - **Port Oakhaven Hub**: Positioned as the primary central trade hub with direct connections to all three specialized settlements (Millbrook at $30\text{ km}$, Pinewood at $35\text{ km}$, Ironridge at $45\text{ km}$).
    - **Local vs Inter-Peripheral Routes**: Local resource-to-town transit (e.g. Red Rock Crag $\rightarrow$ Ironridge at $12\text{ km}$, Verdant Fields $\rightarrow$ Millbrook at $15\text{ km}$) remains very cheap, whereas cross-province transit between peripheral nodes (e.g. Ironridge $\rightarrow$ Millbrook at $55\text{ km}$) incurs higher freight overhead, creating realistic regional price spreads.

### 2.3 Delivery & Freight Mechanics (`docs/geography/delivery-and-freight.md`)
- **Distance Metric Definition**:
  - Update the definition of $D[u, v]$ in Section 1 to specify physical shortest-path distance rather than effective distance.
- **Worked Calculation Example**:
  - Keep the baseline route `node_millbrook` $\rightarrow$ `node_port_oakhaven` ($30\text{ km}$, freight fee $15.0\text{ Credits}$).
  - Update the multi-hop raw grain calculation for `node_verdant_fields` $\rightarrow$ `node_port_oakhaven`:
    - Distance: $15\text{ km} + 30\text{ km} = 45\text{ km}$ (replacing the previous $51\text{ km eff}$).
    - Freight Cost: $5,000\text{ kg} \times 45\text{ km} \times 0.0001 = 22.5\text{ Credits}$ (replacing $25.5\text{ Credits}$).

## 3. Verification & Impact
- Ensure all markdown formatting, Obsidian wikilinks (`[[...]]`), and LaTeX equations render cleanly.
- Verify consistency across all three geography documents.
