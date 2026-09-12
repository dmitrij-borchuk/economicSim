# Economic Simulator (economicSim)

A multiplayer, step-ticked economic management simulation engine and web application. Players establish enterprises, extract commodities, manage complex multi-tier supply and manufacturing chains, navigate spatial graph logistics, and trade across dynamic regional orderbooks and B2B contracts.

---

## 🏗️ Project Structure

- **`server/`**: Backend simulation engine and REST/WebSocket API built with [NestJS](https://nestjs.com/) (TypeScript, Vitest, Oxlint).
- **`web/`**: Interactive frontend client built with [React 19](https://react.dev/) and [Vite](https://vite.dev/).
- **`docs/`**: Obsidian-compatible architectural and game-design knowledge vault covering simulation tick loops, spatial graph models, pricing formulas, and production chains.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v20+ recommended
- **npm** (or `pnpm` / `yarn`)

---

### 1. Server Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the development server with hot-reload
npm run start:dev
```

By default, the API server starts on `http://localhost:3000` (or the port defined by the `PORT` environment variable).

**Other Server Commands:**
- `npm run build` — Compile TypeScript to `dist/`
- `npm test` — Run unit tests with Vitest
- `npm run test:e2e` — Run end-to-end tests
- `npm run lint` — Run Oxlint linter

---

### 2. Web Client Setup

```bash
# Open a new terminal and navigate to the web directory
cd web

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The web client will be available at `http://localhost:5173`.

**Other Web Commands:**
- `npm run build` — Type-check and generate production build
- `npm run preview` — Preview the production build locally
- `npm run lint` — Lint source files with ESLint

---

## 📖 Documentation

Comprehensive system and game mechanics documentation is located in `docs/` :
- [`docs/index.md`](./docs/index.md) — Master Map of Content (MOC)
- **Core Engine**: Tick loops, atomic phases, pacing, and configuration
- **Geography & Logistics**: Spatial node graph, distance-based freight, starter provinces
- **Industry & Production**: Agriculture, forestry, metallurgy, recipes, and quality blending formulas
- **Economy & Markets**: Spot orderbooks, long-term B2B contracts, settlement consumer demand, capital sinks

---

## 🗺️ Roadmap

- [ ] Subscription