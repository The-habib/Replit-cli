# Workspace Rules & Environment Default Settings

This workspace is equipped with extended environment capabilities, Nix binary toolchains, database connectors, and security tools. Follow these default settings and rule directives when executing commands or building features:

---

## 1. Environment Toolchain PATH Directive
When running shell commands using `run_command` that require system binaries like `semgrep`, `osv-scanner`, `ffmpeg`, `pdftoppm`, `rg`, `ag`, or `sd`, ensure `/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin` is present in the `PATH` environment variable:

```bash
export PATH="/nix/store/3mb5pci3v9713drr3jglikrvx3xifl2c-replit-runtime-path/bin:$PATH"
```

---

## 2. Automated Capability Usage Rules

- **Security & Vulnerability Scans**: Use `semgrep` for SAST checks on codebases and `osv-scanner` for auditing project dependencies against open-source vulnerability databases.
- **Media & Document Processing**: Use `ffmpeg` for video/audio operations, `pdftoppm`/`pdftotext` for PDF parsing/rendering, and `antiword` for legacy Word documents.
- **Multi-Agent Orchestration**: Use `invoke_subagent` to spawn specialized background research or coding agents for multi-step tasks.
- **Visual Assets**: Use `generate_image` when creating visual diagrams, UI prototypes, or media assets for user applications.
- **Database Operations**: Use Drizzle ORM and PostgreSQL (`helium:5432`) or SQLite for persistent schema management and storage.
