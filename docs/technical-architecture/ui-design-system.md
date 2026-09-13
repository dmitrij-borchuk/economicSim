---
title: UI Visual Design System
tags:
  - technical
  - architecture
  - ui
  - design-system
  - frontend
type: specification
status: approved
created: 2026-09-13
---

# UI Visual Design System

This document defines the visual design system for the client interface.
The interface displays market data, logistics graphs, and production networks in real time.

For full-stack architecture, see [[system-design-overview]].
For network events, see [[api-and-websocket-protocol]].

---

## 1. Visual Identity

The visual identity uses an industrial telemetry style for science fiction.
Dark background surfaces reduce eye fatigue during long simulation sessions.
High-contrast text and bright accent lines frame dense data displays.
Panels use sharp corners with thin borders to show clear functional areas.

---

## 2. Color Palette

The interface uses five functional color groups.

| Token Name | Hex Value | Semantic Role |
|---|---|---|
| Background Base |  <div style="background-color: #0A0D12; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#0A0D12` | Viewport canvas and base background |
| Surface Card |  <div style="background-color: #121721; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#121721` | Panels, modules, and container backgrounds |
| Surface Border |  <div style="background-color: #1E2638; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#1E2638` | Structural separation lines and card borders |
| Telemetry Cyan |  <div style="background-color: #00E5FF; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#00E5FF` | Active simulation indicators and route lines |
| Financial Green |  <div style="background-color: #00E676; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#00E676` | Buy orders, revenue, and positive cash flow |
| Financial Red |  <div style="background-color: #FF3D71; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#FF3D71` | Sell orders, expenses, and negative cash flow |
| Neutral Slate |  <div style="background-color: #64748B; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#64748B` | Secondary text, inactive states, and labels |
| Text Primary |  <div style="background-color: #F1F5F9; width: 20px; height: 20px; display: inline-block; vertical-align: middle;"></div>`#F1F5F9` | Primary text, headers, and active metric values |

---

## 3. Dual-State Financial Model

The interface uses green and red to display financial state changes.
Green indicates buy actions, income, and positive account balances.
Red indicates sell actions, expenses, and negative account balances.
Cyan marks active simulation ticks and real-time network transmissions.
Neutral slate marks idle facilities and inactive filters.

---

## 4. Typography

The interface uses two font families.
Inter displays all titles, navigation buttons, and field labels.
JetBrains Mono displays numerical telemetry, timestamps, and order books.
Fixed-width numbers prevent layout shifts when values update on simulation ticks.

| Role | Font Family | Size | Weight | Target Element |
|---|---|---|---|---|
| View Header | Inter | 20px | 700 | Main page titles |
| Card Header | Inter | 14px | 600 | Panel and drawer titles |
| Control Label | Inter | 12px | 500 | Form and field labels |
| Metric Value | JetBrains Mono | 16px | 600 | Cash amounts and inventory counts |
| Table Cell | JetBrains Mono | 13px | 400 | Orderbook rows and ledger data |
| Tick Clock | JetBrains Mono | 11px | 400 | Tick counters and timestamps |

---

## 5. Component Styling Rules

Data panels must use 1-pixel borders with sharp 0-pixel radius corners.
Do not use rounded corners on data containers.
Status indicators must pair a colored glyph with short status text.
Data tables must show sticky headers and alternating row backgrounds.
Action buttons must show high-contrast hover borders.

---

## Related Notes

- [[system-design-overview]] - Full-stack client-server architecture topology.
- [[api-and-websocket-protocol]] - WebSocket tick messages and REST endpoints.
- [[data-schemas]] - TypeScript models and database schemas.
- [[simulation-tick-loop]] - The 7-phase engine execution loop.
