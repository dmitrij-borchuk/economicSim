# Economic Simulator Design Specification

- **Date**: 2026-09-12
- **Status**: Approved
- **Topic**: Multiplayer Web-Based Step-Tick Economic Management Simulator

---

## 1. Executive Summary
An economic simulation game where players manage corporate enterprises across an evolving spatial world. The game operates on discrete, server-authoritative ticks (configurable step duration). Players gather raw resources from regional deposits, process them through multi-tier transformation supply chains with numeric quality ratings ($Q \in [1, 100]$), trade through regional spot markets and B2B recurring contracts, and deliver goods via shortest-path transit. The economy begins in the balanced "Oakhaven Basin" starter province and scales toward an entire planetary network.

---

## 2. Core Decisions & Architectural Parameters

| Decision Domain | Selected Approach | Key Rationale |
|---|---|---|
| **Core Nature** | Multiplayer web-based management game | High replayability, player-driven economy, web accessibility |
| **Tick Engine** | Persistent server tick running 24/7 (configurable interval) | Fair asynchronous multiplayer, predictable batch execution |
| **Spatial Geography** | Hierarchical node-and-edge graph (Settlements, Deposits, Hubs) | Scalable from starter province to planetary network without micro-tile pathfinding overhead |
| **Logistics & Delivery** | Instantaneous delivery within tick with shortest-path distance fee | Clean deterministic accounting, realistic geographic economic friction |
| **Resource Deposits** | Infinite reserves in Phase 1 with region-specific extraction yields | Simplicity in Phase 1 while driving geographic trade advantages |
| **Production Inputs** | Pure material inputs (no labor or energy grid in Phase 1) | Modular, focused simulation core; easy to expand later |
| **Quality System** | Numeric $Q \in [1, 100]$ with weighted batch blending & tech modifiers | Organic differentiation between budget and luxury goods |
| **Markets & Trade** | Dual: Spot order books at trade hubs + recurring B2B supply contracts | Supports both active market speculation and automated supply pipelines |
| **Economic Sinks** | Hybrid sink: Settlement retail population + Facility construction/upgrades | Sustainable closed-loop monetary and material circulation |
| **Starter Territory** | "Oakhaven Basin" province with 3 balanced sectors | Agriculture (Bread), Forestry (Furniture), Metallurgy/Construction (Tools & Kits) |
| **Player Onboarding** | Guided License Starter (Miner, Farmer, Craftsman) | Immediate engagement with a pre-built facility and operating capital |
| **Technology Stack** | TypeScript Full-Stack (Fastify, PostgreSQL/Prisma, Redis, React/Vite) | Unified types, high I/O throughput, interactive web UI |

---

## 3. Tick Execution Lifecycle
Each tick runs sequentially through 7 atomic phases:
1. **B2B Contracts & Recurring Deliveries**: Automated material transfers and payment settlements.
2. **Resource Extraction**: Raw resource gathering based on node yield and facility level.
3. **Industrial Transformation**: Recipe consumption, quality blending, and finished good output.
4. **Spot Market Order Matching**: Continuous double auctions at regional trade hubs.
5. **Settlement Retail Consumption**: NPC population purchases finished goods based on utility $U = \frac{Q^{0.6}}{P^{0.9}}$.
6. **Capital Construction & Upgrades**: Building sites consume construction kits, bricks, and tools.
7. **Accounting, Maintenance & State Snapshot**: Operating fees deducted; state persisted to PostgreSQL/Redis; WebSocket diffs broadcast to clients.

---

## 4. Documentation Strategy (`docs/` Obsidian Vault)
All systems, formulas, recipes, maps, and technical schemas will be authored in `docs/` using Obsidian-flavored Markdown:
- YAML frontmatter metadata.
- Bidirectional `[[wikilinks]]`.
- LaTeX math formulas.
- Mermaid architecture and supply-chain diagrams.
- Central Map of Content in `docs/index.md`.
