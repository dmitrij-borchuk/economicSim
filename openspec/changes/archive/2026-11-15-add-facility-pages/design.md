# Design

## Context

See `proposal.md` for motivation and scope. Currently, `web/src/App.tsx` defines only one protected route (`/`, rendering `DashboardPage`) inside `AppLayout`. Facility records in `company.facilities` (`FacilitySummary` in `web/src/libs/store/authSlice.ts`) contain `{ id, name, facilityType, nodeId, level }`, while canonical simulation recipes and base maintenance values live in `docs/industry-and-production/transformation-chains.md`. Because facility leveling and maximum-level mechanics are not finalized, the facility views must remain independent of level scaling, upgrade tiers, or max-level caps.

All frontend code follows strict Atomic Design conventions (`atoms` -> `molecules` -> `organisms` -> `templates` -> `pages`) and houses domain logic under `web/src/libs/<feature>/` as documented in `web/AGENTS.md` and `web/src/components/AGENTS.md`.

## Goals / Non-Goals

**Goals:**
- Provide a pure, type-safe facility specification catalog in `web/src/libs/facilities/` (category, display label, base maintenance, and per-batch recipe inputs/outputs) without coupling to facility levels or max-level formulas.
- Build reusable facility telemetry organisms and pages following `web/src/components/AGENTS.md` (named exports, props type exported first, component exported second, styled components via `@/libs/styled` at the bottom of the file).
- Integrate seamless navigation between `/`, `/facilities`, and `/facilities/:facilityId`.

**Non-Goals:**
- Facility level scaling, upgrade BOM formulas, or max-level UI states.
- Backend REST endpoints (`/api/facilities/*`) or database schema mutations.
- Mutating facility state (constructing, upgrading, or changing active recipes).

## Decisions

### 1. Client-Side Facility Catalog (`web/src/libs/facilities/`)
- **Decision**: Create `web/src/libs/facilities/` containing a typed catalog mapping known `facilityType` keys (`GRAIN_FARM`, `LUMBER_CAMP`, `IRON_MINE`, `STONE_QUARRY`, `FLOUR_MILL`, `BAKERY`, `SAWMILL`, `CARPENTRY_WORKSHOP`, `SMELTER`, `BRICK_KILN`, `TOOLSMITH`, `CONSTRUCTION_YARD`) to their category (`EXTRACTOR` | `PROCESSOR` | `MANUFACTURER`), display label, base maintenance cost per tick, and per-batch inputs/outputs, with a graceful fallback for unknown facility types.
- **Rationale**: Keeps UI components thin and declarative without baking in unconfirmed level or upgrade formulas.
- **Alternatives Considered**: Including level-scaled throughput and upgrade BOM calculations. Rejected because facility level progression and max-level mechanics are still undecided.

### 2. Route Structure (`web/src/App.tsx`)
- **Decision**: Register two routes under `<ProtectedRoute><AppLayout /></ProtectedRoute>`:
  - `/facilities` -> `FacilitiesPage`
  - `/facilities/:facilityId` -> `FacilityDetailPage`
- **Rationale**: Preserves the persistent `Header` command bar across all authenticated views and supports deep-linking directly to a specific installation from either the Dashboard or the directory.

### 3. Component Decomposition (Atomic Design)
- **Decision**:
  - `organisms/facilities/FacilitiesSummaryBanner.tsx`: Renders portfolio-level telemetry counters (total facilities, operational status count, estimated base upkeep per tick).
  - `organisms/facilities/FacilityRosterCard.tsx`: Renders an enriched card for a single facility in `/facilities` with category/status tags, node location, recipe summary, base upkeep, and an inspect action.
  - `organisms/facilities/FacilityInspectorCard.tsx`: Renders the 3-panel detailed telemetry view for `/facilities/:facilityId` (01. Installation Telemetry, 02. Production & Recipe, 03. Associated Warehouse Stock).
  - `pages/FacilitiesPage.tsx` and `pages/FacilityDetailPage.tsx`: Connect `useAuth()` and `libs/facilities` helpers to `PageTemplate` and the facility organisms.
- **Rationale**: Adheres to `web/AGENTS.md` and `web/src/components/AGENTS.md` by keeping domain lookups in `libs/facilities/`, domain widgets in `organisms/facilities/`, and route wiring in `pages/`.

## Risks / Trade-offs

- **[Risk] Unrecognized `facilityType` strings from future backend updates** → **Mitigation**: Provide a default fallback specification (`CATEGORY: GENERAL`, `baseMaintenance: 20`, generic extraction/processing description) in `getFacilitySpec(facilityType)` so the UI never crashes on unknown types.
- **[Risk] Warehouse inventory is currently stored at the company level rather than per-facility** → **Mitigation**: On `FacilityDetailPage`, filter `company.inventory` to highlight commodity lots matching the facility's inputs and outputs (or display company-wide storage context clearly labeled as warehouse stock for that commodity).
