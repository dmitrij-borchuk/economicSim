---
title: Corporate Management & Financial Accounting
tags:
  - player
  - company
  - finance
  - balance-sheet
  - accounting
type: specification
status: approved
created: 2026-09-12
---

# Corporate Management & Financial Accounting

In the economic simulator, players act as Chief Executive Officers of an incorporated enterprise (`Company`). Every facility, warehouse, market order, and contract is owned and financed by the corporate balance sheet.

For founding details, see [[onboarding-and-licenses]].
For operational maintenance fees, see [[transformation-chains]].
For extraction plot capacity limits, see [[resource-extraction]].
For execution of accounting in the tick lifecycle, see [[simulation-tick-loop|Tick Phase 7]].

---

## 1. Company Data Entity

```typescript
export interface Company {
  id: string;
  name: string;
  ticker: string;              // e.g. "OAK-AGRO"
  ownerUserId: string;
  cashBalance: number;         // Liquid currency in Credits
  reputation: number;          // 0 - 100 metric based on contract fulfillment
  creditRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC';
  facilities: string[];        // Array of Facility IDs
  createdAtTick: number;
}
```

---

## 2. Double-Entry Accounting & Financial Statements

During [[simulation-tick-loop|Tick Phase 7]], the financial ledger aggregates per-tick activity into corporate accounting reports:

### Income Statement (Profit & Loss):
$$\text{NetProfit} = \text{TotalRevenue} - \text{TotalOperatingExpenses}$$

- **Revenues**:
  - `SpotMarketSales`: Gross proceeds from trades cleared in [[spot-exchange-orderbooks|Phase 4]].
  - `B2BContractReceipts`: Revenues collected from recurring supply lines in [[b2b-contracts|Phase 1]].
  - `RetailSales`: Direct revenue from town civilian consumption in [[settlement-consumer-demand|Phase 5]].
- **Expenses**:
  - `InputMaterialPurchases`: Sourced commodities.
  - `LogisticsFreightFees`: Distance shipping fees from [[delivery-and-freight]].
  - `FacilityMaintenance`: Base upkeep fees per processing facility level.
  - `MarketExchangeFees`: $2.0\%$ exchange levy on spot market sales.

---

## 3. Balance Sheet & Net Worth Calculation

A company's official corporate valuation (**Net Worth**) is evaluated every tick and published to the global leaderboards:

$$\text{NetWorth} = \text{LiquidCash} + \sum_{f \in \text{Facilities}} \text{AssetValue}(f) + \sum_{i \in \text{Inventory}} (\text{Qty}_i \times \text{VWAP}_i)$$

Where:
- $\text{LiquidCash}$: Unencumbered currency in Credits.
- $\text{AssetValue}(f)$: Depreciated replacement capital cost of the facility structure and its installed technology level (calculated via [[capital-construction-sink]]).
- $\text{Qty}_i \times \text{VWAP}_i$: Physical commodities in warehouses, marked to market using the 24-tick Volume-Weighted Average Price (VWAP) at the nearest regional trade hub.

---

## 4. Insolvency, Overdraft & Restructuring

If a company's cash reserves drop into negative numbers ($\text{CashBalance} < 0$):
1. **Operating Freeze**: In Phase 7, if a facility cannot cover its per-tick maintenance fee, its status shifts from `OPERATING` to `IDLE`. The facility produces no output and consumes no materials until funds are restored.
2. **Contract Default**: The company fails to fulfill its active [[b2b-contracts]], triggering contract breaches and liquidated damage penalties.
3. **Credit Downgrade**: The company's credit rating drops, restricting its ability to participate in high-value trade hub bids.
4. **Liquidation Mode**: The player can liquidate resting inventory at fire-sale discounts or auction off facility plots to raise emergency liquidity.

---

## Related Notes
- [[onboarding-and-licenses]] - Initial starter packages and capital.
- [[capital-construction-sink]] - Balance sheet valuation of facilities and upgrades.
- [[simulation-tick-loop]] - Accounting evaluation in Tick Phase 7.
- [[spot-exchange-orderbooks]] - Revenue generation and transaction fee deduction.
