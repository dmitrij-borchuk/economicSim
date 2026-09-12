---
title: Starter Province Map: Oakhaven Basin
tags:
  - geography
  - starter-province
  - map
  - oakhaven
type: specification
status: approved
created: 2026-09-12
---

# Starter Province Map: Oakhaven Basin

The **Oakhaven Basin** is the localized starter territory for Phase 1 of the economic simulation. It is designed to be geographically self-sufficient, hosting balanced agricultural, forestry, and mining/metallurgical sectors.

For the mathematical graph foundation, see [[spatial-graph-model]].
For delivery fee calculations across these nodes, see [[delivery-and-freight]].

---

## 1. Map Topology Diagram

```mermaid
graph TD
    PO[Port Oakhaven<br>Pop: 25,000 | Central Hub]
    MB[Millbrook<br>Pop: 8,000 | Farm Town]
    IR[Ironridge<br>Pop: 6,000 | Mining Town]
    PW[Pinewood<br>Pop: 5,000 | Forest Town]

    VF[Verdant Fields<br>Grain Node: 1.4x]
    WP[Whispering Pines<br>Timber Node: 1.3x]
    RC[Red Rock Crag<br>Iron: 1.5x | Stone: 1.2x]

    PO <== Paved Highway: 30km ==> MB
    MB <== Dirt Road: 15km ==> VF
    PO <== Coastal Sea Lane: 45km ==> IR
    IR <== Mountain Trail: 12km ==> RC
    PO <== Paved Highway: 35km ==> PW
    PW <== Dirt Road: 10km ==> WP
    MB <== Dirt Road: 40km ==> PW
    IR <== Dirt Road: 55km ==> MB
```

---

## 2. Settlement Nodes Directory

| Settlement Node ID | Display Name | Population | Wealth Tier | Specialization | Role |
|---|---|---|---|---|---|
| `node_port_oakhaven` | **Port Oakhaven** | 25,000 | Middle/Upper | Commerce, Shipping, Construction Assembly | Central trade hub host to the primary spot exchange order book; major consumption sink for luxury goods. |
| `node_millbrook` | **Millbrook** | 8,000 | Agrarian | Milling, Food Production, Baking | Agricultural breadbasket; major grain buyer and flour producer. |
| `node_ironridge` | **Ironridge** | 6,000 | Industrial | Smelting, Brick Kilns, Toolsmiths | Heavy industry center nestled at the foot of the mountain range. |
| `node_pinewood` | **Pinewood** | 5,000 | Frontier | Logging, Sawmills, Carpentry | Timber harvesting and woodcrafting center in the boreal forest. |

---

## 3. Natural Resource Nodes Directory

| Resource Node ID | Display Name | Coordinates | Resource Types | Yield Multipliers | Base Deposit Quality |
|---|---|---|---|---|---|
| `node_verdant_fields` | **Verdant Fields** | `(120, 280)` | `GRAIN` | **1.4x** (40% bonus) | $Q = 55$ |
| `node_whispering_pines` | **Whispering Pines** | `(310, 390)` | `TIMBER` | **1.3x** (30% bonus) | $Q = 50$ |
| `node_red_rock_crag` | **Red Rock Crag** | `(420, 110)` | `IRON_ORE`, `STONE` | **1.5x** (Iron), **1.2x** (Stone) | $Q = 60$ (Iron), $Q = 50$ (Stone) |

---

## 4. Corridor & Distance Matrix

The table below lists all direct edges in the Oakhaven Basin network:

| Origin Node ($u$) | Destination Node ($v$) | Physical Distance ($d$) | Corridor Type | Terrain Multiplier ($C_t$) | Effective Distance ($d_{\text{eff}}$) |
|---|---|---|---|---|---|
| `node_port_oakhaven` | `node_millbrook` | $30\text{ km}$ | `PAVED_HIGHWAY` | $1.0$ | **$30\text{ km}$** |
| `node_millbrook` | `node_verdant_fields` | $15\text{ km}$ | `DIRT_ROAD` | $1.4$ | **$21\text{ km}$** |
| `node_port_oakhaven` | `node_ironridge` | $45\text{ km}$ | `COASTAL_SEALANE` | $0.4$ | **$18\text{ km}$** |
| `node_ironridge` | `node_red_rock_crag` | $12\text{ km}$ | `DIRT_ROAD` | $1.4$ | **$16.8\text{ km}$** |
| `node_port_oakhaven` | `node_pinewood` | $35\text{ km}$ | `PAVED_HIGHWAY` | $1.0$ | **$35\text{ km}$** |
| `node_pinewood` | `node_whispering_pines`| $10\text{ km}$ | `DIRT_ROAD` | $1.4$ | **$14\text{ km}$** |
| `node_millbrook` | `node_pinewood` | $40\text{ km}$ | `DIRT_ROAD` | $1.4$ | **$56\text{ km}$** |
| `node_ironridge` | `node_millbrook` | $55\text{ km}$ | `DIRT_ROAD` | $1.4$ | **$77\text{ km}$** |

### Strategic Geographic Dynamics:
- **Port Oakhaven's Coastal Advantage**: Although Ironridge is physically $45\text{ km}$ away from Port Oakhaven, the coastal sea lane gives it an effective distance of only $18\text{ km}$, making sea freight of heavy iron and stone very cheap.
- **Inland Grain Route**: Millbrook can supply Port Oakhaven along the paved highway with low transit cost, but shipping grain over land to Ironridge incurs an effective distance of $77\text{ km}$, making it cheaper for Ironridge to import flour through Port Oakhaven.

---

## Related Notes
- [[spatial-graph-model]] - Mathematical formulation of the world graph.
- [[delivery-and-freight]] - Exact shipping fee formulas for these routes.
- [[agriculture-chain]] - Farming in Millbrook & Verdant Fields.
- [[forestry-chain]] - Logging in Pinewood & Whispering Pines.
- [[metallurgy-construction-chain]] - Mining in Ironridge & Red Rock Crag.
