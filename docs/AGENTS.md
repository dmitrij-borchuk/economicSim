# Agent Instructions: Technical Documentation & Specifications (`docs/`)

## 🎯 Purpose & Scope
This directory contains the canonical game-design specifications and software architecture documentation for **economicSim**:
- Core engine simulation formulas and tick-cycle contracts.
- Spatial graph models, logistics formulas, and regional geography definitions.
- Industry transformation recipes, input/output ratios, and quality blending rules.
- Market models, orderbook exchange mechanics, and macroeconomic sinks.
- Technical system design, entity schemas, API specifications, and design system tokens.

---

## 🛠️ Tooling & Standards

All documentation in `docs/` must follow two core standards: **Obsidian** and **ASD-STE100**.

### 1. Obsidian Knowledge Vault
This directory is structured as a bidirectional **Obsidian** vault:
- **Obsidian-Flavored Markdown**:
  - Use Obsidian wikilinks `[[document-name]]` or `[[document-name|Display Text]]` for all cross-document references.
  - Do not use relative file paths for internal documentation links.
  - Maintain the master index in [`index.md`](./index.md) whenever you add, rename, or remove documents.
- **YAML Frontmatter**:
  - Every document must start with valid YAML frontmatter containing metadata:
    ```yaml
    ---
    title: Document Title
    tags:
      - relevant-tag
    type: specification | reference | guide
    status: draft | approved | deprecated
    created: YYYY-MM-DD
    ---
    ```
- **Diagrams & Mathematical Formulas**:
  - Use Mermaid diagrams (`mermaid` code blocks) for flowcharts, lifecycles, and architecture maps.
  - Use LaTeX notation (`$...$` for inline math, `$$...$$` for block math) for simulation equations.

---

## ✍️ Writing Standard: ASD-STE100 (Simplified Technical English)

All specifications and instructions must follow **ASD-STE100** principles. ASD-STE100 eliminates ambiguity for AI agents, translation systems, and software engineers.

For detailed guidelines, see the repository skill at [`.agents/skills/asd-ste100/SKILL.md`](../.agents/skills/asd-ste100/SKILL.md).

### Core Structural Rules
Agents authoring or editing documents in `docs/` must obey these structural rules:

---

## 📐 Document Modification Workflow

When updating or adding documentation:
1. **Locate Target Section**: Find the target domain folder (`core-engine/`, `economy-and-markets/`, `geography/`, `industry-and-production/`, `player-progression/`, or `technical-architecture/`).
2. **Apply ASD-STE100**: Write new sections using the concise ASD-STE100 rules.
3. **Link Bidirectionally**: Add wikilinks pointing to related specifications.
4. **Update the MOC**: Verify that any new document is registered in [`index.md`](./index.md).
