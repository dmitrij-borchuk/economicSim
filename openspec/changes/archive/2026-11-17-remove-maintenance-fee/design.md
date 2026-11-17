# Design

## Context

See `proposal.md` for motivation and scope. Currently, facility maintenance fees and processing credit costs appear in two places:
1. Canonical game-design specifications in `docs/` (`transformation-chains.md`, `simulation-tick-loop.md`, and `company-management.md`).
2. Frontend facility domain metadata (`web/src/libs/facilities/facilityCatalog.ts`) and the three facility telemetry organisms (`FacilitiesSummaryBanner.tsx`, `FacilityRosterCard.tsx`, and `FacilityInspectorCard.tsx`).

The backend (`server/`) has not implemented tick execution or maintenance fees, so no backend source files require changes.

## Goals / Non-Goals

**Goals:**
- Align the canonical game-design vault (`docs/`) with a material-only facility production model (zero passive per-tick maintenance and zero per-batch credit processing fee).
- Remove `baseMaintenance` and `totalBaseMaintenance` from `web/src/libs/facilities/facilityCatalog.ts`.
- Update `FacilitiesSummaryBanner`, `FacilityRosterCard`, and `FacilityInspectorCard` so no maintenance or upkeep fields are rendered and desktop grid layouts remain balanced.

**Non-Goals:**
- Modifying logistics freight fees (`delivery-and-freight.md`), spot market transaction fees (`spot-exchange-orderbooks.md`), or capital construction/upgrade costs (`capital-construction-sink.md`).
- Changing backend `server/` endpoints or data models.

## Decisions

### 1. Pure Material-Driven Transformation & Tick Phase 7
- **Decision**:
  - In `docs/industry-and-production/transformation-chains.md`, remove `baseProcessingCost` from `Recipe`, remove the `Base Maintenance` column from the facility table, update partial batching ($B = 0$) so the facility simply idles for that tick without an upkeep cost, and remove the $\text{Maintenance}(L) = \text{BaseMaintenance} \times L^{0.85}$ scaling formula.
  - In `docs/core-engine/simulation-tick-loop.md`, rename Phase 7 to `Phase 7: Accounting & State Snapshot` and remove the maintenance deduction step.
  - In `docs/player-progression/company-management.md`, remove `FacilityMaintenance` from the operating expenses list and remove the `Operating Freeze` insolvency rule that depended on unpaid per-tick maintenance.
- **Rationale**: Eliminates all references to per-tick and per-batch facility credit fees across the specification vault so future server tick implementations follow a single consistent rule.
- **Alternatives Considered**: Setting `baseMaintenance: 0` in docs and catalog — rejected because keeping dead fields and zero-value telemetry columns adds visual noise and conceptual overhead.

### 2. Three-Column Desktop Layout for Facility Banner and Roster Cards
- **Decision**: Change `SummaryGrid` in `FacilitiesSummaryBanner.tsx` and `RosterBodyGrid` in `FacilityRosterCard.tsx` from `repeat(4, 1fr)` to `repeat(3, 1fr)` on desktop (`lg` and up), and remove the unused `formatCurrency` imports from all three facility organism components.
- **Rationale**: Both components previously rendered 4 columns where 1 column was dedicated to maintenance/upkeep. Removing that column leaves 3 equal telemetry columns (`TOTAL INSTALLATIONS`, `OPERATIONAL STATUS`, `CATEGORY DISTRIBUTION` in the banner; `INSTALLATION TYPE`, `SECTOR & NODE LOCATION`, `PRODUCTION RECIPE (PER BATCH)` in each roster card).
- **Alternatives Considered**: Keeping `repeat(4, 1fr)` with an empty or duplicate metric column — rejected because a 3-column grid naturally fills the card width and matches `FacilityInspectorCard`'s 3-column structure.

## Risks / Trade-offs

- **[Risk] Unused imports or props after removing maintenance fields** → **Mitigation**: Remove `formatCurrency` imports from `FacilitiesSummaryBanner.tsx`, `FacilityRosterCard.tsx`, and `FacilityInspectorCard.tsx`, and run `npm run lint` and `npm run build` in `web/` to verify zero unused symbol or type errors.
