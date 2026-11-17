# Proposal

## Why

Passive per-tick facility maintenance fees and per-batch processing credit fees introduce unnecessary ongoing cash drain and idle-freeze complexity before the core production and trade loops are active. Removing maintenance fees across the game design specifications and web client ensures facilities operate purely on material inputs and outputs, keeping documentation, telemetry UI, and domain models aligned.

## What Changes

- **Game Design Specifications (`docs/`)**:
  - Remove `baseProcessingCost` from the `Recipe` interface, remove the `Base Maintenance` column from the transformation facilities table, remove idle maintenance references on partial batching ($B = 0$), and remove the $\text{Maintenance}(L) = \text{BaseMaintenance} \times L^{0.85}$ scaling formula in `docs/industry-and-production/transformation-chains.md`.
  - Rename Tick Phase 7 from `Phase 7: Maintenance, Accounting & State Snapshot` to `Phase 7: Accounting & State Snapshot` and remove the maintenance deduction step in `docs/core-engine/simulation-tick-loop.md`.
  - Remove `FacilityMaintenance` from corporate operating expenses, remove the maintenance cross-reference, and remove the maintenance-triggered `Operating Freeze` insolvency rule in `docs/player-progression/company-management.md`.
- **Frontend Facility Domain Catalog (`web/src/libs/facilities/`)**:
  - **BREAKING**: Remove `baseMaintenance` from `FacilitySpec`, `FACILITY_CATALOG`, and `DEFAULT_FACILITY_SPEC`, and remove `totalBaseMaintenance` from `FacilityPortfolioSummary` and `calculatePortfolioSummary`.
- **Frontend Facility Telemetry Organisms (`web/src/components/organisms/facilities/`)**:
  - Remove the `EST. BASE UPKEEP / TICK` column from `FacilitiesSummaryBanner` and adjust its desktop grid layout from 4 columns to 3 columns (`repeat(3, 1fr)`).
  - Remove the `BASE MAINTENANCE / TICK` column from `FacilityRosterCard` and adjust its desktop grid layout from 4 columns to 3 columns (`repeat(3, 1fr)`).
  - Remove the `BASE MAINTENANCE UPKEEP` field block from `FacilityInspectorCard`.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `facility-telemetry-views`: Remove base maintenance / upkeep telemetry requirements and scenarios from the facilities directory page (`/facilities`) and single-facility inspector page (`/facilities/:facilityId`).

## Impact

- **Documentation (`docs/`)**: `docs/industry-and-production/transformation-chains.md`, `docs/core-engine/simulation-tick-loop.md`, `docs/player-progression/company-management.md`
- **Web Domain Library (`web/src/libs/facilities/`)**: `facilityCatalog.ts`
- **Web UI Organisms (`web/src/components/organisms/facilities/`)**: `FacilitiesSummaryBanner.tsx`, `FacilityRosterCard.tsx`, `FacilityInspectorCard.tsx`
- **OpenSpec Specifications (`openspec/specs/`)**: `openspec/specs/facility-telemetry-views/spec.md`
