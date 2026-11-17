# Tasks

## 1. Game Design Specifications (`docs/`)

- [x] 1.1 Update `docs/industry-and-production/transformation-chains.md` to remove `baseProcessingCost` from `Recipe`, remove the `Base Maintenance` column from the transformation facilities table, remove idle maintenance cost from Partial Batching ($B = 0$), and remove the `Maintenance Scaling` formula ($\text{Maintenance}(L) = \text{BaseMaintenance} \times L^{0.85}$), verifying no maintenance or processing cost references remain in the file.
- [x] 1.2 Update `docs/core-engine/simulation-tick-loop.md` to rename `Phase 7: Maintenance, Accounting & State Snapshot` to `Phase 7: Accounting & State Snapshot` in the Mermaid flowchart and section heading, and remove the facility maintenance deduction step, verifying no maintenance references remain in the file.
- [x] 1.3 Update `docs/player-progression/company-management.md` to remove the operational maintenance fees link, remove `FacilityMaintenance` from the Expenses list, and remove the maintenance-based `Operating Freeze` rule under Insolvency, verifying no maintenance or upkeep references remain in `docs/`.

## 2. Web Facility Catalog & Telemetry Organisms (`web/`)

- [x] 2.1 Update `web/src/libs/facilities/facilityCatalog.ts` to remove `baseMaintenance` from `FacilitySpec`, `FACILITY_CATALOG`, and `DEFAULT_FACILITY_SPEC`, and remove `totalBaseMaintenance` from `FacilityPortfolioSummary` and `calculatePortfolioSummary`, verifying `facilityCatalog.ts` contains no maintenance fields.
- [x] 2.2 Update `web/src/components/organisms/facilities/FacilitiesSummaryBanner.tsx`, `web/src/components/organisms/facilities/FacilityRosterCard.tsx`, and `web/src/components/organisms/facilities/FacilityInspectorCard.tsx` to remove the maintenance/upkeep telemetry blocks, remove unused `formatCurrency` imports, and change `SummaryGrid` and `RosterBodyGrid` desktop columns from `repeat(4, 1fr)` to `repeat(3, 1fr)`, verifying `npm run lint` and `npm run build` in `web/` succeed with zero errors.
