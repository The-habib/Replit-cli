---
name: environment-capabilities
description: >-
  Comprehensive guide and runtime setup for all environment capabilities discovered in this workspace.
  Activate when running CLI tasks, security audits (semgrep, osv-scanner), media processing (ffmpeg, pdftoppm),
  database operations (Helium Postgres, Drizzle), multi-agent subagent tasks, or when needing access to extended Nix toolchains.
---

# Environment Capabilities Skill

This skill documents and configures access to all live system capabilities, runtime toolpaths, and automated workflows in this Replit / MicroVM environment.

---

## 1. Runtime Toolchain & PATH Configuration

Always prepend the Nix runtime path when invoking system binaries (`semgrep`, `osv-scanner`, `ffmpeg`, `pdftoppm`, `rg`, `ag`, `sd`, `antiword`):

```bash
export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"
```

---

## 2. Core Installed Tooling Reference

| Tool Category | Command / Binaries | Usage & Capabilities |
| :--- | :--- | :--- |
| **Security Auditing** | `semgrep`, `osv-scanner` | SAST code analysis and dependency vulnerability auditing |
| **Media Processing** | `ffmpeg`, `pdftoppm`, `magick` | Video/audio transcoding, PDF page-to-image extraction, image processing |
| **Code Search & Edit** | `rg`, `ag`, `sd` | Millisecond regex search, pattern matching, and AST/string replacements |
| **Node.js & Workspaces**| `node` (v24), `pnpm` (v10) | Node 24 ES module execution, pnpm workspace scripts, TypeScript 5.9 |
| **Database Systems** | `helium:5432` PostgreSQL, SQLite 3 | Serverless Postgres database via Drizzle ORM, embedded SQLite |
| **Document Processing** | `antiword`, `pdftotext` | Text extraction from legacy `.doc` and `.pdf` files |

---

## 3. Multi-Agent & Subagent Workflows

- Use `invoke_subagent` to delegate complex subtasks (e.g. `research` subagent for deep code audits, search, or transcript review).
- Subagents run autonomously and report back results asynchronously.

---

## 4. Visual Generation & Artifacts

- Use `generate_image` for visual UI mockups, architecture diagrams, and concept artwork.
- Embed images and markdown documents into structured artifacts in `<appDataDir>/brain/<conversation-id>/`.
