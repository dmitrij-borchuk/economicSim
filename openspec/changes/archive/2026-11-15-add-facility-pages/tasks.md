# Tasks

## 1. Facility Domain Catalog (`web/src/libs/facilities/`)

- [x] 1.1 Create `web/src/libs/facilities/facilityCatalog.ts` and `web/src/libs/facilities/index.ts` defining facility category types, static specs (`GRAIN_FARM`, `LUMBER_CAMP`, `IRON_MINE`, `STONE_QUARRY`, `FLOUR_MILL`, `BAKERY`, `SAWMILL`, `CARPENTRY_WORKSHOP`, `SMELTER`, `BRICK_KILN`, `TOOLSMITH`, `CONSTRUCTION_YARD`, plus fallback) with per-batch inputs/outputs and base maintenance (no level or max-level coupling), and verify `npm run build` in `web/` typechecks without errors.

## 2. Facility Telemetry Organisms (`web/src/components/organisms/facilities/`)

- [x] 2.1 Create `FacilitiesSummaryBanner.tsx` and `FacilityRosterCard.tsx` in `web/src/components/organisms/facilities/` following `web/src/components/AGENTS.md` rules (props type exported first, component second, styled components at the end via `@/libs/styled`), and verify `npm run lint` passes.
- [x] 2.2 Create `FacilityInspectorCard.tsx` in `web/src/components/organisms/facilities/` displaying the 3 telemetry sections (01. Installation Telemetry, 02. Production & Recipe, 03. Associated Warehouse Stock) and export all facility organisms from `web/src/components/organisms/facilities/index.ts` and `web/src/components/organisms/index.ts`, verifying `npm run lint` and `npm run build` succeed.

## 3. Facility Pages & Routing (`web/src/components/pages/` & `web/src/App.tsx`)

- [x] 3.1 Create `FacilitiesPage.tsx` (`/facilities`) and `FacilityDetailPage.tsx` (`/facilities/:facilityId`, including not-found fallback with return action to `/facilities`) in `web/src/components/pages/` and export them from `web/src/components/pages/index.ts`, verifying `npm run build` succeeds.
- [x] 3.2 Register `/facilities` and `/facilities/:facilityId` under the protected `AppLayout` route in `web/src/App.tsx`, and verify both routes compile and lint cleanly.

## 4. Navigation Integration (`Header.tsx` & `CompanyOverviewCard.tsx`)

- [x] 4.1 Update `web/src/components/organisms/header/Header.tsx` to include `DASHBOARD` (`/`) and `FACILITIES` (`/facilities`) navigation controls with active-route styling, and verify `npm run lint` passes.
- [x] 4.2 Update `web/src/components/organisms/dashboard/CompanyOverviewCard.tsx` (and `TelemetryAssetCard.tsx` if click handling is needed) so clicking the `03. SECTOR & FACILITIES` action navigates to `/facilities` and clicking an individual facility card navigates to `/facilities/:facilityId`, then verify `npm run lint` and `npm run build` pass in `web/`.
