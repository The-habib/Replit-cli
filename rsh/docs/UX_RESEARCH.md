# CLI UX Research & Interaction Principles — `rsh`

**Analysis Date**: 2026-08-14  
**Comparative Targets**: Google Gemini CLI, Anthropic Claude Code, GitHub CLI (`gh`), Warp Terminal, Bun, pnpm, Docker CLI, Vercel CLI.

---

## 1. Benchmarking Modern CLI UX Patterns

| Reference CLI | Key Interaction Pattern | Adopted in `rsh` Design System v2 |
| :--- | :--- | :--- |
| **GitHub CLI (`gh`)** | Editorial error messages with "What / Why / How to fix" and `gh auth status` diagnostics | [`renderEditorialError`](file:///home/runner/workspace/rsh/core/ui/error-view.ts) & [`rsh doctor`](file:///home/runner/workspace/rsh/cli/commands/doctor.ts) |
| **Claude Code & Gemini CLI** | Multi-stage autonomous step indicators & diff previews with syntax coloring | [`renderTimeline`](file:///home/runner/workspace/rsh/core/ui/timeline.ts) & [`renderDiff`](file:///home/runner/workspace/rsh/core/ui/diff.ts) |
| **Vercel CLI** | Clean deployment state badges (`● Ready`, `▲ Warning`) & domain routing previews | [`renderBadge`](file:///home/runner/workspace/rsh/core/ui/badge.ts) & [`rsh deploy status`](file:///home/runner/workspace/rsh/cli/commands/deploy.ts) |
| **pnpm & Bun** | High-speed terminal startup, compact mobile views, tree structures | [`renderTree`](file:///home/runner/workspace/rsh/core/ui/tree.ts) & [`TerminalDetector`](file:///home/runner/workspace/rsh/core/render/terminal.ts) |
| **Warp Terminal** | Block-based container cards with visual borders | [`renderBox`](file:///home/runner/workspace/rsh/core/layout/box.ts) & [`renderCard`](file:///home/runner/workspace/rsh/core/ui/card.ts) |

---

## 2. Core Design Principles in `rsh`

1. **Editorial Clarity over Raw Dumps**:
   - Commands never spit unformatted JSON unless explicitly requested with `--json`.
   - Data is rendered into responsive, ANSI-aware tables with column auto-shrinking.

2. **Calm Visual Hierarchy**:
   - Palette tailored with high-contrast text, muted borders, and purposeful accent badges.
   - Respects `NO_COLOR=1` and offers `--monochrome` flag for zero-escape ASCII environments.

3. **Intelligent Command Suggestion**:
   - Levenshtein-based distance matcher catches typos (e.g. `rsh deploi` ➔ suggests `rsh deploy`).

4. **Contextual & Non-Blocking Spinners**:
   - Automatically switches loader glyphs according to operation (deploy vs sync vs AI research) and disables in CI/headless mode.
