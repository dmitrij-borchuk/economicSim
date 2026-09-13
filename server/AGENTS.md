# Agent Instructions: Backend Server & Simulation Engine (`server/`)

## 🎯 Purpose & Scope
This directory contains the core backend services for **economicSim**:
- The step-ticked economic simulation engine (production cycles, spatial graph logistics, consumer settlement, orderbook matching).
- REST and WebSocket APIs exposing world state, company management, trade orders, and real-time tick events to clients.

---

## 🛠️ Tech Stack & Tooling

- **Runtime & Language**: Node.js v20+, TypeScript (configured for ECMAScript Modules: `"type": "module"`).
- **Framework**: [NestJS](https://nestjs.com/) (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`).
- **Telemetry & Config**: `@nestjs/config`, `@nestjs/observe`.
- **Testing Engine**: [Vitest](https://vitest.dev/) v4 (`vitest`, `@vitest/coverage-v8`).
- **Linter & Formatter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (`oxlint`), Prettier.

### Standard Commands (Execute from `server/`)
- `npm run start:dev` — Start server with hot-reload / watch mode.
- `npm run build` — Compile TypeScript using Nest CLI to `dist/`.
- `npm run lint` — Fast linting via Oxlint.
- `npm run format` — Auto-format code with Prettier.
- `npm test` — Run unit tests with Vitest.
- `npm run test:watch` — Run Vitest in interactive watch mode.
- `npm run test:e2e` — Run end-to-end integration tests (`vitest.config.e2e.ts`).
- `npm run test:cov` — Run tests with code coverage reporting.

---

## 📐 Architecture & Coding Standards

### 1. ESM Import Convention (Mandatory)
Because this project uses native ECMAScript Modules (`"type": "module"`), **all relative local imports must include the `.js` extension**, even when importing `.ts` source files:
```typescript
// ✅ CORRECT:
import { SimulationService } from './simulation.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

// ❌ INCORRECT:
import { SimulationService } from './simulation.service';
```

### 2. Simulation Engine Architecture
- **Tick Loops & Determinism**:
  - Keep simulation phases discrete and sequential: *Ingestion -> Production -> Freight Movement -> Market Clearance -> Settlement Demand*.
  - Domain simulation calculations must be deterministic. If randomness is needed (e.g. weather, quality roll), use a seedable pseudo-random generator, not unseeded `Math.random()`.
  - Use integer or fixed-point arithmetic for currency and commodity units to prevent floating-point drift.
- **Layer Separation**:
  - Keep domain logic (economic calculations, graph traversals, orderbook algorithms) in pure services or domain model classes decoupled from HTTP/WebSocket transport layers.
  - Controllers and Gateways should only handle request parsing, authentication/authorization, and delegating to services.

### 3. NestJS Best Practices
- **Dependency Injection**: Always inject dependencies through class constructors using standard NestJS DI patterns.
- **DTOs & Data Validation**: Define strict TypeScript classes/interfaces for all request bodies, query parameters, and WebSocket messages. Validate payloads before processing.
- **Error Handling**: Use NestJS built-in HTTP exceptions (e.g., `BadRequestException`, `NotFoundException`, `ForbiddenException`). For WebSockets, emit standardized error frames.
- **Configuration**: Use `@nestjs/config` `ConfigService` rather than accessing `process.env` directly inside business logic.

---

## 🧪 Verification Checklist

Before finishing any task in `server/`, verify:
1. `npm run lint` completes with zero errors.
2. `npm run build` compiles cleanly without TypeScript errors.
3. `npm test` passes for affected test suites.
