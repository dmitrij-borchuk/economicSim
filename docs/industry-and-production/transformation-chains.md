---
title: Industrial Transformation & Recipe Chains
tags:
  - industry
  - production
  - transformation
  - manufacturing
  - recipes
type: specification
status: approved
created: 2026-09-12
---

# Industrial Transformation & Recipe Chains

Industrial transformation facilities process raw commodities and intermediate goods into refined products, capital equipment, and consumer goods. Transformation operations execute during [[simulation-tick-loop|Tick Phase 3]].

For quality calculation formulas across recipe transformations, see [[quality-system]].
For specific supply chain configurations, see:
- [[agriculture-chain]]
- [[forestry-chain]]
- [[metallurgy-construction-chain]]

---

## 1. Recipe Execution Engine

Every transformation facility is configured with an active **Recipe**. A recipe defines input requirements, output yields, and production ratios:

```typescript
export interface Recipe {
  id: string;
  name: string;
  facilityType: string;
  inputs: Array<{
    itemType: string;
    quantity: number;
    minQuality?: number;
  }>;
  outputs: Array<{
    itemType: string;
    quantity: number;
  }>;
  baseProcessingCost: number; // In Credits per batch
}
```

### Execution Rules per Tick:
1. **Input Verification**: The facility inspects its internal inventory. It calculates the maximum number of full batches $B$ it can process:
   $$B = \min\left(\text{FacilityLevel}, \min_{i \in \text{Inputs}} \left\lfloor \frac{\text{InventoryQty}(i)}{\text{RequiredQty}(i)} \right\rfloor\right)$$
2. **Material Consumption**: If $B \ge 1$, the facility consumes $B \times \text{RequiredQty}(i)$ units of each input item.
3. **Quality Evaluation**: Output quality is calculated from the consumed input batches using the weighted blending algorithm defined in [[quality-system]].
4. **Production Output**: The facility generates $B \times \text{OutputQty}$ units of the finished item and adds them to its output warehouse.
5. **Partial Batching**: If inputs are insufficient for even 1 batch ($B = 0$), the facility idles for that tick, incurring only the idle maintenance cost.

---

## 2. Transformation Facilities Summary Table

| Facility | Inputs Required per Batch | Outputs per Batch | Base Maintenance | Sector |
|---|---|---|---|---|
| **Flour Mill** | $2\times \text{Grain}$ | $1\times \text{Flour}$ | $20\text{ Cr/tick}$ | [[agriculture-chain\|Agriculture]] |
| **Bakery** | $1\times \text{Flour}$ | $2\times \text{Bread}$ | $30\text{ Cr/tick}$ | [[agriculture-chain\|Agriculture]] |
| **Sawmill** | $2\times \text{Timber}$ | $2\times \text{Planks}$ | $25\text{ Cr/tick}$ | [[forestry-chain\|Forestry]] |
| **Carpentry Workshop** | $2\times \text{Planks}$ | $1\times \text{Furniture}$ | $35\text{ Cr/tick}$ | [[forestry-chain\|Forestry]] |
| **Smelter** | $2\times \text{Iron Ore}$ | $1\times \text{Iron Ingot}$ | $50\text{ Cr/tick}$ | [[metallurgy-construction-chain\|Metallurgy]] |
| **Brick Kiln** | $2\times \text{Stone}$ | $2\times \text{Bricks}$ | $30\text{ Cr/tick}$ | [[metallurgy-construction-chain\|Construction]] |
| **Toolsmith** | $1\times \text{Iron Ingot} + 1\times \text{Plank}$ | $2\times \text{Tools}$ | $45\text{ Cr/tick}$ | [[metallurgy-construction-chain\|Heavy Industry]] |
| **Construction Yard** | $2\times \text{Iron Ingot} + 4\times \text{Bricks} + 4\times \text{Planks}$ | $1\times \text{Building Kit}$ | $60\text{ Cr/tick}$ | [[capital-construction-sink\|Capital Expansion]] |

---

## 3. Throughput Scaling & Facility Upgrades

Facilities can be upgraded from Level 1 up to Level 10:
- **Throughput Capacity**: Directly proportional to facility level ($\text{Capacity} = \text{BaseBatch} \times \text{Level}$). A Level 3 Bakery processes up to 3 batches per tick ($3\text{ Flour} \to 6\text{ Bread}$).
- **Upgrade Costs**: Upgrades require capital goods (Tools, Bricks, Building Kits) as detailed in [[capital-construction-sink]].
- **Maintenance Scaling**: Maintenance cost scales sub-linearly to reward industrial scale:
  $$\text{Maintenance}(L) = \text{BaseMaintenance} \times L^{0.85}$$

---

## Related Notes
- [[resource-extraction]] - Upstream raw commodity sources.
- [[quality-system]] - Quality formulas applied during transformation.
- [[capital-construction-sink]] - Consuming Building Kits and Tools for facility expansion.
- [[spot-exchange-orderbooks]] - Selling manufactured outputs on the open market.
