# facility-telemetry-views Specification

## Purpose

Provides authenticated players with dedicated read-only telemetry views to browse their corporate facility portfolio (`/facilities`) and inspect individual installations (`/facilities/:facilityId`), enriched with canonical category, production recipe, and base upkeep specifications.

## Requirements

### Requirement: Top-level and dashboard facility navigation
The web client SHALL provide navigation controls in the application header and on the Dashboard company overview card so authenticated players with an active company can navigate to the facilities directory (`/facilities`) and to any individual facility inspector (`/facilities/:facilityId`).

#### Scenario: Navigate to facilities directory from top header
- **WHEN** an authenticated player clicks the `FACILITIES` navigation control in the top header
- **THEN** the client navigates to `/facilities` and visually marks `FACILITIES` as the active navigation route

#### Scenario: Navigate to facilities directory from dashboard overview
- **WHEN** an authenticated player clicks the facilities section action link on the Dashboard `CompanyOverviewCard`
- **THEN** the client navigates to `/facilities`

#### Scenario: Navigate to a specific facility from dashboard overview
- **WHEN** an authenticated player clicks a facility card inside `CompanyOverviewCard` on the Dashboard
- **THEN** the client navigates to `/facilities/:facilityId` for that facility's `id`

### Requirement: Facilities directory page (`/facilities`)
The system SHALL render a protected facilities directory page at `/facilities` displaying portfolio-wide summary metrics (total installations, operational status count, and category distribution) and a roster of all facilities owned by the player's company.

#### Scenario: View owned facilities on directory page
- **WHEN** an authenticated player with one or more facilities visits `/facilities`
- **THEN** the page displays the portfolio summary metrics and renders a telemetry card for each owned facility showing its name, ID, category, facility type, sector node, and production output summary

#### Scenario: Select a facility from the directory roster
- **WHEN** an authenticated player clicks a facility entry or its inspect action on `/facilities`
- **THEN** the client navigates to `/facilities/:facilityId` for the selected facility

#### Scenario: Empty facilities state on directory page
- **WHEN** an authenticated player whose company has zero facilities visits `/facilities`
- **THEN** the page displays an empty-state telemetry message indicating no active facilities are registered

### Requirement: Single-facility inspector page (`/facilities/:facilityId`)
The system SHALL render a protected single-facility inspector page at `/facilities/:facilityId` displaying read-only telemetry for the matching company facility across installation telemetry, production and recipe specifications, and associated warehouse inventory.

#### Scenario: Inspect a valid owned facility
- **WHEN** an authenticated player visits `/facilities/:facilityId` with an ID matching one of their company's facilities
- **THEN** the page displays the facility's identity and sector node, its category and input/output batch recipe, and matching commodity lots from the company warehouse inventory

#### Scenario: Visit an unknown or unowned facility ID
- **WHEN** an authenticated player visits `/facilities/:facilityId` with an ID that does not exist in their company's facilities list
- **THEN** the page displays a not-found telemetry state and provides an action to return to `/facilities`
