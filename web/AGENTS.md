# Agent Instructions: Frontend Web Client (`web/`)

## 🎯 Purpose & Scope
This directory contains the user-facing web application for **economicSim**:
- Interactive dashboard for enterprise management, facility construction, and supply chain configuration.
- Real-time market orderbooks, contract boards, freight network maps, and spatial node visualizations.
- Live telemetry and tick-progression monitoring connected to the backend server.

---

## 🛠️ Tech Stack & Tooling

- **Framework**: [React 19](https://react.dev/) (`react`, `react-dom` v19+).
- **Bundler & Dev Server**: [Vite](https://vite.dev/) v8 (`@vitejs/plugin-react`).
- **Language**: TypeScript (v6+, strict project references via `tsc -b`).
- **Component & Design System**: [Material UI](https://mui.com/) v9 (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`).
- **Linter**: ESLint v10 (`eslint-plugin-react-hooks`, `typescript-eslint`).

### Standard Commands (Execute from `web/`)
- `npm run dev` — Start the local Vite development server (default: `http://localhost:5173`).
- `npm run build` — Run TypeScript typecheck (`tsc -b`) and bundle for production (`vite build`).
- `npm run lint` — Lint source files using ESLint.
- `npm run preview` — Locally preview the production build output.

---

## 📐 Architecture & Design Guidelines

### 1. Material UI & Styling
- **MUI Theme System**: Use MUI's theme tokens (`palette`, `typography`, `spacing`, `shape`) via `ThemeProvider` rather than hardcoding colors or magic spacing numbers in CSS.
- **Modern Aesthetic**:
  - Prefer clean, high-contrast dark or hybrid themes appropriate for dense economic dashboards.
  - Utilize MUI components (`Button`, `Card`, `Typography`, `DataGrid`/`Table`, `Chip`, `Drawer`, `Dialog`) consistently.
  - Use `sx` prop or `@emotion/styled` for localized component customizations.

### 2. Component Structure & Atomic Design
Structure UI components following **Atomic Design** principles to ensure reusability, testability, and clear separation of concerns:

- **Directory Organization**:
  ```
  web/src/
  ├── components/
  │   ├── atoms/       # Smallest UI primitives (CurrencyBadge, StatusDot, CustomButton, MetricLabel)
  │   ├── molecules/   # Groups of atoms acting as a unit (ResourceCounter, SearchBar, PriceInputGroup)
  │   ├── organisms/   # Complex domain sections (OrderbookTable, FacilityCard, LogisticsGraph, Navbar)
  │   ├── pages/       # Full pages/screens connecting templates & organisms to state (MarketView, MapView)
  │   └── templates/   # Page layout skeletons/frames with slots (DashboardLayout, SplitViewLayout)
  ├── libs/            # Business & domain logic grouped into feature subfolders
  │   ├── <feature>/   # e.g., orderbook/, simulation/, logistics/, company/
  │   └── shared/      # Cross-cutting utilities, base HTTP/WS adapters, shared helpers
  ├── App.tsx          # Root application layout
  └── main.tsx         # Entry point and provider wrapping
  ```

- **Atomic Design Principles**:
  - **Atoms**: Pure presentational components wrapping or styling MUI primitives. Zero business logic or store dependencies.
  - **Molecules**: Compositions of 2+ atoms. Minimal internal state (e.g., input focus, hover), driven primarily via props and callbacks.
  - **Organisms**: Domain-aware widgets composed of atoms and molecules. Can accept domain interfaces (e.g., `OrderbookRecord`), handle local user interaction, but delegate persistent mutations to parent views or hooks.
  - **Templates**: Layout structures defining placement, grids, and responsiveness using component slots/props (`children`, `sidebar`, `header`). No direct data fetching.
  - **Pages**: The top-level composition layer where hooks, WebSocket subscriptions, and global context are wired into templates and organisms.

### 3. Business & Domain Logic in `libs/`
All application logic, data transformations, and state abstractions **must reside in `web/src/libs/` partitioned by feature**:
- **Feature Subfolders**: Group logic by domain capability (e.g., `libs/orderbook/`, `libs/logistics/`, `libs/simulation/`, `libs/facilities/`).
- **Separation from UI**: Components in `components/` should remain thin and declarative. Never embed complex calculations, raw WebSocket handlers, or API calls directly inside component bodies.
- **Hook & Service Exports**: Expose feature hooks (e.g., `useOrderbook()`, `useFreightRoutes()`) and services from their respective `libs/<feature>/` modules.
- **Shared Logic**: Generic utilities, HTTP client configurations, and global helpers that span multiple features belong in `libs/shared/` or `libs/common/`.

### 4. React 19 Best Practices
- Write pure, modern functional components.
- Strictly adhere to Rules of Hooks (`react-hooks/rules-of-hooks`).
- Take advantage of React 19 primitives (`useActionState`, `useOptimistic`, etc.) where beneficial for transactional interactions.

### 5. Simulation Performance & State Management
- **High-Frequency State Updates**: The backend simulation updates state via step ticks. Avoid storing massive monolithic objects in top-level state that cause full-app re-renders on every tick.
- **Selective Subscriptions**: Scope tick listeners and state hooks to the specific view or component that displays that data.
- **Memoization**: Employ `useMemo` and `useCallback` judiciously on computationally intensive data transformations (e.g., graph routing display, orderbook sorting).

### 6. Accessibility & Polish
- Ensure all interactive elements have accessible labels (`aria-label`, visible titles).
- Maintain responsive layouts supporting standard desktop screen sizes (1280px+) and responsive scaling for smaller viewports.

---

## 🧪 Verification Checklist

Before finishing any task in `web/`, verify:
1. `npm run lint` completes without ESLint errors or warnings.
2. `npm run build` succeeds (both `tsc -b` typechecking and `vite build`).
