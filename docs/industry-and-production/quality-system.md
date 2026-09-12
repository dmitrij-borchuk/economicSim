---
title: Quality System & Blending Mathematics
tags:
  - industry
  - quality
  - math
  - mechanics
  - economy
type: specification
status: approved
created: 2026-09-12
---

# Quality System & Blending Mathematics

The economic simulation features a continuous numeric **Quality Rating** $Q \in [1.0, 100.0]$ assigned to every physical commodity in the world. Quality drives price premiums on the open market, governs recipe eligibility, and dictates consumer purchasing decisions.

For how recipes consume input materials, see [[transformation-chains]].
For how quality influences consumer purchasing, see [[settlement-consumer-demand]].

---

## 1. Quality Tiers & Market Significance

| Quality Range | Grade Name | Economic Role | Example Market Impact |
|---|---|---|---|
| **$1.0 - 25.0$** | *Substandard / Scrap* | Budget utility; bought by low-income settlements at steep discounts. | $30\% - 50\%$ price penalty. |
| **$25.1 - 50.0$** | *Standard Utility* | Commodity baseline; standard industrial throughput. | Baseline index price ($1.0\times$). |
| **$50.1 - 75.0$** | *Refined / Commercial* | Quality goods; preferred by middle-class towns and required for high-tier building kits. | $15\% - 40\%$ price premium. |
| **$75.1 - 100.0$** | *Masterwork / High-Tech* | Luxury items; commands highest margins and drives settlement prosperity. | $50\% - 150\%$ price premium. |

---

## 2. Inventory Batch Merging Formula

When a facility warehouse receives new items of a type it already stores, the incoming batch is merged into the existing inventory. The new aggregate quality is computed as the **volume-weighted average**:

$$Q_{\text{merged}} = \frac{(\text{Qty}_{\text{existing}} \times Q_{\text{existing}}) + (\text{Qty}_{\text{incoming}} \times Q_{\text{incoming}})}{\text{Qty}_{\text{existing}} + \text{Qty}_{\text{incoming}}}$$

$$\text{Qty}_{\text{total}} = \text{Qty}_{\text{existing}} + \text{Qty}_{\text{incoming}}$$

### Practical Implication:
If a manufacturer attempts to dilute a small high-quality batch with cheap low-quality inputs, the resulting inventory quality drops proportionally. Players must maintain separate storage or supply discipline if they wish to produce premium goods.

---

## 3. Primary Resource Extraction Quality Formula

Raw materials extracted directly from natural resource deposits (such as Grain, Timber, Iron Ore, and Stone) do not have intrinsic deposit qualities. Instead, the quality of freshly harvested commodities is calculated dynamically from the operator's installed equipment/tools and facility technology during [[simulation-tick-loop|Tick Phase 2]]:

$$Q_{\text{harvested}} = \min\left(100.0, Q_{\text{equipment}} \times (1 + \text{TechBonus})\right)$$

Where:
- $Q_{\text{equipment}}$: The quality rating of the tools or machinery equipped at the extraction facility (e.g. `TOOLS` crafted by a Toolsmith; defaults to baseline $50.0$ if unequipped).
- $\text{TechBonus}$: Corporate technological improvement fraction.

This creates a self-reinforcing economic loop: higher-tier crafted tools yield higher-grade raw materials, which in turn feed higher-quality downstream manufacturing.

---

## 4. Transformation Output Quality Formula

When a factory processes input items into an output item during [[simulation-tick-loop|Tick Phase 3]]:

### Step 1: Input Weighted Quality
Each input material contributes to the product's base quality according to its assigned recipe weight fraction $w_i \in [0, 1]$, where $\sum_{i=1}^n w_i = 1.0$:

$$Q_{\text{base\_output}} = \sum_{i=1}^n (w_i \times Q_i)$$

For single-input recipes (e.g. Grain $\to$ Flour), $w_1 = 1.0$, so $Q_{\text{base\_output}} = Q_{\text{grain}}$.

### Step 2: Facility Technology Modifier
The facility's technical sophistication, precision tools, and operational bonuses apply a multiplicative modifier:

$$Q_{\text{final\_output}} = \min\left(100.0, Q_{\text{base\_output}} \times (1 + \text{FacilityTechBonus})\right)$$

Where:
- $\text{FacilityTechBonus} \ge 0.0$ (e.g., $+0.05$ for Level 2 machinery, up to $+0.25$ for advanced installations).

---

## 5. Worked Calculation Example

### Scenario:
A **Toolsmith** crafts `TOOLS` requiring $1\times \text{IRON\_INGOT}$ (weight $w_1 = 0.6$) and $1\times \text{PLANK}$ (weight $w_2 = 0.4$).
- The facility holds Iron Ingots at $Q_{\text{iron}} = 65.0$.
- The facility holds Planks at $Q_{\text{wood}} = 50.0$.
- The facility has a Technology Bonus of $+10\%$ ($\text{TechBonus} = 0.10$).

### Calculation:
1. **Base Output Quality**:
   $$Q_{\text{base}} = (0.6 \times 65.0) + (0.4 \times 50.0) = 39.0 + 20.0 = 59.0$$
2. **Applying Tech Modifier**:
   $$Q_{\text{final}} = 59.0 \times (1 + 0.10) = 59.0 \times 1.10 = 64.9$$
3. **Result**:
   The output tools enter the warehouse at **$Q = 64.9$** (Refined Grade), eligible for higher-tier construction recipes, advanced extraction equipment, and premium market contracts.

---

## 6. Quality in Spot Orders & B2B Contracts

- In [[spot-exchange-orderbooks]], buyers can specify a `minQuality` filter. An order book match will **only** execute if the seller's lot satisfies $Q_{\text{seller}} \ge Q_{\text{buyer\_min}}$.
- In [[b2b-contracts]], supply lines specify a strict SLA: if the supplier's warehouse quality dips below the agreed $Q_{\text{contract}}$, the automated transfer halts to protect the buyer from contamination.

---

## Related Notes
- [[resource-extraction]] - Primary commodity harvesting and equipment quality mechanics.
- [[transformation-chains]] - Recipe execution and batch throughput.
- [[settlement-consumer-demand]] - How town populations evaluate quality.
- [[spot-exchange-orderbooks]] - Order matching rules with quality constraints.
- [[b2b-contracts]] - Quality SLAs in supply agreements.
