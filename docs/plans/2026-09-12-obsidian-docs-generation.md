# Economic Simulator Obsidian Documentation Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Author a comprehensive, interlinked Obsidian Markdown documentation vault in the `docs/` directory detailing both game mechanics and technical software architecture for the step-ticked multiplayer economic simulator.

**Architecture:** Modular documentation structure organized into 6 domains (Core Engine, Geography, Production, Economy/Markets, Player Progression, Technical Architecture) connected via bidirectional Obsidian wikilinks (`[[...]]`), YAML frontmatter, LaTeX math formulas, and Mermaid diagrams.

**Tech Stack:** Obsidian Markdown, GitHub Flavored Markdown, LaTeX math, Mermaid.js, TypeScript/Prisma code blocks.

---

### Task 1: Core Engine & Configuration Documentation

**Files:**
- Create: `docs/core-engine/simulation-tick-loop.md`
- Create: `docs/core-engine/configuration-and-parameters.md`

**Step 1: Write simulation tick loop document**
Detail the deterministic 7-phase server tick sequence, atomic batch boundaries, phase transitions, and state isolation. Include a Mermaid flowchart of the tick lifecycle.

**Step 2: Write configuration and parameters document**
Detail all configurable parameters (tick duration in seconds, base yields, tax rates, quality scaling factors, market fee percentages) with default values and JSON schema representations.

**Step 3: Commit**
```bash
git add docs/core-engine/
git commit -m "docs: add simulation tick loop and engine configuration specs"
```

---

### Task 2: Spatial Graph & Logistics Geography Documentation

**Files:**
- Create: `docs/geography/spatial-graph-model.md`
- Create: `docs/geography/starter-province-map.md`
- Create: `docs/geography/delivery-and-freight.md`

**Step 1: Write spatial graph model**
Define the node-and-edge topological graph $G = (V, E)$, coordinate representation, and planetary scaling hierarchy (Nodes $\to$ Regions $\to$ Continents $\to$ Planet).

**Step 2: Write starter province map specification**
Define the concrete "Oakhaven Basin" starter province: 4 settlements (Port Oakhaven, Millbrook, Ironridge, Pinewood), 3 resource nodes (Verdant Fields, Whispering Pines, Red Rock Crag), edge distances, and transit types.

**Step 3: Write delivery and freight specification**
Define the instantaneous shortest-path distance delivery fee formula, cargo weight metrics, and terrain transit cost multipliers.

**Step 4: Commit**
```bash
git add docs/geography/
git commit -m "docs: add spatial graph model, starter province map, and freight specs"
```

---

### Task 3: Industry, Quality & Starter Production Chains Documentation

**Files:**
- Create: `docs/industry-and-production/resource-extraction.md`
- Create: `docs/industry-and-production/transformation-chains.md`
- Create: `docs/industry-and-production/quality-system.md`
- Create: `docs/industry-and-production/starter-chains/agriculture-chain.md`
- Create: `docs/industry-and-production/starter-chains/forestry-chain.md`
- Create: `docs/industry-and-production/starter-chains/metallurgy-construction-chain.md`

**Step 1: Write resource extraction and transformation specs**
Document extraction rates, regional yield multipliers, recipe schema, facility throughput, batch conversion, and facility level scaling.

**Step 2: Write quality system specification**
Define the numeric $Q \in [1, 100]$ model, weighted input blending formulas, facility tech bonuses, recipe quality thresholds, and market price valuation modifiers.

**Step 3: Write the 3 starter supply chain documents**
- Agriculture: Grain Farm $\to$ Flour Mill $\to$ Bakery $\to$ Bread.
- Forestry: Lumber Camp $\to$ Sawmill $\to$ Carpentry Workshop $\to$ Furniture.
- Metallurgy & Construction: Iron Mine & Stone Quarry $\to$ Smelter & Brick Kiln $\to$ Toolsmith & Construction Yard $\to$ Tools & Building Kits.

**Step 4: Commit**
```bash
git add docs/industry-and-production/
git commit -m "docs: add extraction, transformation, quality, and starter supply chain specs"
```

---

### Task 4: Economy, Markets, Contracts & Consumption Sinks Documentation

**Files:**
- Create: `docs/economy-and-markets/spot-exchange-orderbooks.md`
- Create: `docs/economy-and-markets/b2b-contracts.md`
- Create: `docs/economy-and-markets/settlement-consumer-demand.md`
- Create: `docs/economy-and-markets/capital-construction-sink.md`

**Step 1: Write spot exchange and order book mechanics**
Document continuous double auction logic at trade hubs, price-time priority matching, limit orders, bid/ask spreads, and transaction settlement.

**Step 2: Write B2B recurring supply contracts specification**
Document automated recurring delivery agreements, minimum quality guarantees, breach-of-contract rules, and automated fulfillment in Tick Phase 1.

**Step 3: Write settlement consumer demand and capital construction sinks**
Document the town population utility function ($U = \frac{Q^{0.6}}{P^{0.9}}$) and consumer good absorption, plus facility construction and upgrade material consumption tables.

**Step 4: Commit**
```bash
git add docs/economy-and-markets/
git commit -m "docs: add spot markets, B2B contracts, and consumption sinks specs"
```

---

### Task 5: Player Progression & Onboarding Documentation

**Files:**
- Create: `docs/player-progression/onboarding-and-licenses.md`
- Create: `docs/player-progression/company-management.md`

**Step 1: Write onboarding and starter licenses**
Detail the 3 starting franchise paths (Miner, Farmer, Craftsman), pre-built starter facilities, initial grant of 25,000 Credits, and early-game tutorials/milestones.

**Step 2: Write company management mechanics**
Document company balance sheets, revenue/expense tracking, facility operation limits, and expansion rules.

**Step 3: Commit**
```bash
git add docs/player-progression/
git commit -m "docs: add player onboarding, licenses, and company management specs"
```

---

### Task 6: Technical Software Architecture & Data Schemas

**Files:**
- Create: `docs/technical-architecture/system-design-overview.md`
- Create: `docs/technical-architecture/data-schemas.md`
- Create: `docs/technical-architecture/api-and-websocket-protocol.md`

**Step 1: Write system design overview**
Document the TypeScript full-stack client-server architecture: Fastify API server, headless tick runner worker, Redis in-memory cache/pub-sub, and PostgreSQL persistent store.

**Step 2: Write data schemas document**
Define complete TypeScript models and Prisma ORM schemas for `Company`, `Facility`, `InventoryItem`, `MarketOrder`, `B2BContract`, `Settlement`, and `ResourceNode`.

**Step 3: Write API endpoints and WebSocket protocol**
Detail REST endpoints for player actions (`/api/orders`, `/api/contracts`, `/api/facilities`) and the real-time WebSocket tick broadcast envelope (`TickUpdatePayload`).

**Step 4: Commit**
```bash
git add docs/technical-architecture/
git commit -m "docs: add full-stack technical architecture, data schemas, and API specs"
```

---

### Task 7: Master Map of Content (MOC) & Graph Verification

**Files:**
- Modify: `docs/index.md`

**Step 1: Update docs/index.md**
Transform `docs/index.md` into the comprehensive master Map of Content (MOC) with categorized links to all newly created notes, an overview callout, and Obsidian tags.

**Step 2: Verify all wikilinks across docs/**
Audit all `[[...]]` links to verify that all target filenames exist and link cleanly in Obsidian.

**Step 3: Final Commit**
```bash
git add docs/
git commit -m "docs: finalize master Map of Content and verify all Obsidian wikilinks"
```
