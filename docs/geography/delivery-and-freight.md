---
title: Delivery, Logistics & Freight Mechanics
tags:
  - geography
  - logistics
  - delivery
  - freight
  - economy
type: specification
status: approved
created: 2026-09-12
---

# Delivery, Logistics & Freight Mechanics

In Phase 1 of the economic simulator, logistics is implemented via **Instantaneous Delivery with Distance Freight Fees**. Deliveries do not require managing vehicle convoys or multi-tick travel queues; instead, shipments resolve immediately upon transaction or contract execution, with a distance-proportional fee deducted automatically.

For the spatial graph and distances, see [[spatial-graph-model]] and [[starter-province-map]].
For trading settlement, see [[spot-exchange-orderbooks]] and [[b2b-contracts]].

---

## 1. Delivery Fee Formula

Whenever $N$ units of an item are moved from origin node $u$ to destination node $v$, the total freight fee is calculated as:

$$\text{FreightCost}(u, v, \text{Item}, N) = \max\left(\text{MinFee}, N \times W(\text{Item}) \times D[u, v] \times R_{\text{freight}}\right)$$

Where:
- $N$: Number of item units transported.
- $W(\text{Item})$: Cargo weight coefficient of the item in kilograms ($\text{kg/unit}$).
- $D[u, v]$: Shortest physical graph distance between origin $u$ and destination $v$ in kilometers ($\text{km}$), as precomputed in [[spatial-graph-model]].
- $R_{\text{freight}}$: Base freight rate constant, default $0.0001\text{ Credits / (kg} \cdot \text{km)}$ (see [[configuration-and-parameters]]).
- $\text{MinFee}$: Minimum logistics handling fee per dispatch, default $10.0\text{ Credits}$.

If $u = v$ (intra-node transfer, e.g. moving flour from a mill to a bakery in the same settlement):
$$\text{FreightCost}(u, u, \text{Item}, N) = \text{MinFee} = 10.0\text{ Credits}$$

---

## 2. Standard Cargo Weight Table

Heavier bulk materials incur substantially higher freight costs, making local processing near extraction nodes far more economical than shipping raw commodities across the planet.

| Item Category | Sample Items | Weight per Unit ($W$) | Economic Significance |
|---|---|---|---|
| **Heavy Minerals** | `IRON_ORE`, `STONE`, `COAL` | **$100\text{ kg}$** | Very expensive to haul raw; incentivizes local smelting at [[metallurgy-construction-chain|Ironridge]]. |
| **Heavy Construction** | `BRICKS`, `IRON_INGOTS` | **$60\text{ kg}$** | Moderately dense; incurs moderate freight overhead over long distances. |
| **Timber Products** | `TIMBER`, `PLANKS` | **$50\text{ kg}$** | Medium weight; processing into planks reduces waste before long-haul transit. |
| **Agricultural Bulk** | `GRAIN`, `FLOUR` | **$25\text{ kg}$** | Light bulk; economical to transport over regional distances. |
| **Manufactured Hardware**| `TOOLS`, `BUILDING_KITS` | **$20\text{ kg}$** | High value-to-weight ratio. |
| **Finished Consumer** | `BREAD`, `FURNITURE` | **$10\text{ kg}$** | High margin; low delivery overhead to retail sinks. |

---

## 3. Freight Payment Allocation Rules

Across all trade mechanics in the economic simulation, the **Buyer always pays the freight fee**:

### In Spot Exchange Trading ([[spot-exchange-orderbooks]]):
- The **Buyer** pays the delivery fee from the seller facility to the buyer facility.
- When an order is matched, the matching engine calculates the exact distance $D[\text{SellerLoc}, \text{BuyerLoc}]$, deducts the freight fee from the buyer's balance, and deposits the goods into the buyer's destination warehouse.

### In B2B Recurring Supply Contracts ([[b2b-contracts]]):
- The **Buyer** always pays the freight fee from the supplier's facility to the buyer's destination facility.
- The freight fee is calculated via shortest-path distance and settled from the buyer's balance in [[simulation-tick-loop|Tick Phase 1]].

---

## 4. Worked Calculation Example

### Scenario:
A bakery in **Port Oakhaven** purchases $200\text{ units}$ of `FLOUR` from a flour mill in **Millbrook**.

1. **Item Parameters**:
   - $N = 200\text{ units}$
   - $W(\text{FLOUR}) = 25\text{ kg/unit}$
   - Total Mass $= 200 \times 25 = 5,000\text{ kg}$ ($5\text{ metric tons}$)
2. **Route Distance**:
   - Direct route from `node_millbrook` to `node_port_oakhaven`:
   - $D[\text{Millbrook}, \text{Port Oakhaven}] = 30\text{ km}$
3. **Freight Calculation**:
   $$\text{FreightCost} = 5,000\text{ kg} \times 30\text{ km} \times 0.0001 = 15.0\text{ Credits}$$
   Since $15.0 > \text{MinFee}$ ($10.0$), the charge is **$15.0\text{ Credits}$** ($0.075\text{ Cr/unit}$).

If the same bakery instead purchased raw `GRAIN` ($25\text{ kg/unit}$) directly from **Verdant Fields**:
- Distance: $15\text{ km (Verdant Fields } \rightarrow \text{ Millbrook)} + 30\text{ km (Millbrook } \rightarrow \text{ Port Oakhaven)} = 45\text{ km}$.
- Freight Cost $= 5,000\text{ kg} \times 45\text{ km} \times 0.0001 = 22.5\text{ Credits}$ ($0.1125\text{ Cr/unit}$).

---

## Related Notes
- [[spatial-graph-model]] - Network topology and distance calculation.
- [[starter-province-map]] - Distances between Oakhaven Basin nodes.
- [[spot-exchange-orderbooks]] - How delivery costs apply to market transactions.
- [[b2b-contracts]] - Freight terms for recurring supply lines.
