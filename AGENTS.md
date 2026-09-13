# Agent Guidelines & Instructions: Economic Simulator (`economicSim`)

Welcome to the **economicSim** repository. This document outlines general standards, architectural principles, and operating instructions for AI coding agents working anywhere in this repository.

---

## 🏛️ Repository Architecture

This repository is a monorepo-style structure consisting of two primary software packages and a shared game-design knowledge base:

```
economicSim/
├── AGENTS.md           # Master agent instructions & conventions (this file)
├── docs/               # Obsidian-compatible game-design & architecture specs
│   ├── AGENTS.md       # Documentation & spec agent instructions
│   └── index.md        # Master Map of Content (MOC)
├── server/             # Backend simulation engine & API (NestJS + TypeScript)
│   └── AGENTS.md       # Server-specific agent instructions
└── web/                # Frontend client application (React 19 + Vite + MUI)
    └── AGENTS.md       # Web-specific agent instructions
```

### Context Isolation
- **Documentation & Specifications**: Work inside [`docs/`](./docs). Follow instructions in [`docs/AGENTS.md`](./docs/AGENTS.md).
- **Backend / Simulation Engine**: Work inside [`server/`](./server). Follow instructions in [`server/AGENTS.md`](./server/AGENTS.md).
- **Frontend / Client Application**: Work inside [`web/`](./web). Follow instructions in [`web/AGENTS.md`](./web/AGENTS.md).
- **Domain Mechanics & Formulas**: Consult [`docs/`](./docs) for canonical specifications on tick pacing, orderbook matching, spatial logistics formulas, and production chains before implementing game logic.

---

## 🧭 Universal Agent Operating Principles

1. **Check Existing Specifications First**:
   - Before implementing economic mechanics, commodity trees, or tick loops, consult [`docs/index.md`](./docs/index.md).
   - Verify existing code patterns and module boundaries before introducing new packages or abstractions.

2. **Surgical, High-Confidence Changes**:
   - Make precise, targeted changes rather than refactoring unrelated files.
   - Preserve existing code conventions, naming schemes, comments, and docstrings.
   - Do not remove or comment out working code unless explicitly instructed or replacing it with an approved alternative.

3. **Strict Type Safety**:
   - Use TypeScript strict typing across both `server` and `web`.
   - Avoid `any` or loose type assertions (`as unknown as ...`) unless interfacing with dynamic third-party payloads, in which case validate and narrow types early.

4. **Always Verify Your Work**:
   - Every modification must be validated using the appropriate commands (build, lint, test) in its respective directory (`server/` or `web/`).
   - Do not report a task as complete if linting or compilation fails.
