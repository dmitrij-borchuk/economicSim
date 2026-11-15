# Proposal

## Why

Currently, a player's corporate facilities are only visible as a brief summary tucked inside a single column of the Dashboard's `CompanyOverviewCard`. Giving facilities their own dedicated pages (`/facilities` and `/facilities/:facilityId`) lets players inspect installation telemetry, sector node placement, production recipes (inputs and outputs), base maintenance upkeep, and associated warehouse stock in a focused workspace that scales as their industrial empire grows.

## What Changes

- Add a static facility domain catalog (`web/src/libs/facilities/`) that enriches `FacilitySummary` records with canonical metadata from the simulation specifications: category (`EXTRACTOR`, `PROCESSOR`, `MANUFACTURER`), production inputs/outputs per batch, and base maintenance cost per tick, without tying calculations or UI to facility level scaling or max-level caps.
- Add a **Facilities Directory Page (`FacilitiesPage`)** at route `/facilities` displaying aggregate installation metrics (total installations, active count, total base upkeep per tick) and a detailed roster of owned facilities with direct links to inspect each installation.
- Add a **Facility Detail Page (`FacilityDetailPage`)** at route `/facilities/:facilityId` displaying read-only telemetry for a single installation: identity & sector node, production recipe (inputs and outputs per batch) & base maintenance, and matching commodity lots from the company's warehouse inventory (plus a not-found state if an invalid `facilityId` is visited).
- Add top-level route navigation (`DASHBOARD` and `FACILITIES`) in `Header.tsx` and interactive navigation links from `CompanyOverviewCard.tsx` on the Dashboard to `/facilities` and `/facilities/:facilityId`.

## Capabilities

### New Capabilities
- `facility-telemetry-views`: Read-only facility directory (`/facilities`) and single-facility inspector (`/facilities/:facilityId`) views, static facility specification lookup, and navigation integration from the application header and dashboard overview.

### Modified Capabilities
<!-- No existing specs in openspec/specs/ -->

## Impact

- **Frontend Routing (`web/src/App.tsx`)**: Adds protected routes `/facilities` and `/facilities/:facilityId` inside `AppLayout`.
- **Domain Logic (`web/src/libs/facilities/`)**: New feature module providing facility specification lookups (category, recipe inputs/outputs, base maintenance) and selector helpers.
- **UI Components (`web/src/components/`)**:
  - `pages/`: Adds `FacilitiesPage.tsx` and `FacilityDetailPage.tsx`.
  - `organisms/facilities/`: Adds organisms for facility directory summary/list and single-facility inspection panels.
  - `organisms/header/Header.tsx` & `organisms/dashboard/CompanyOverviewCard.tsx`: Adds navigation controls to browse all facilities or inspect a specific facility.
- **Backend / API**: No backend or database changes required; uses existing authenticated session state (`company.facilities` and `company.inventory`).
