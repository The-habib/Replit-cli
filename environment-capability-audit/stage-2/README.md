# Deep Replit Capability Discovery — Stage 2 Overview
## Autonomous Latent Capability & Agent Infrastructure Research

This directory contains the **Stage 2 Second-Order Capability Investigation** for this Replit container environment. While Stage 1 identified baseline installed tools and environment attributes, Stage 2 explores what this environment can **connect to, activate, install, orchestrate, expose, provision, automate, or become**.

---

## 📊 Summary of Discoveries

| Category | Count | Description |
| :--- | :---: | :--- |
| **New Capabilities Discovered** | **84** | Latent, secondary, and platform infrastructure capabilities |
| **Verified New Capabilities** | **42** | Empirically tested & confirmed active in this environment |
| **Installable Capabilities** | **35** | High-leverage libraries/tools installable via PyPI/NPM/Nix |
| **Documented but Unavailable** | **4** | Platform features requiring external activation (e.g. Modelfarm AI integration) |
| **Possible Capabilities** | **3** | Architecturally supported but requiring explicit setup (e.g. custom MCP servers) |
| **Unknown Capabilities** | **0** | All targeted vectors fully investigated |

---

## 🗺️ Stage 2 Sitemap & Documentation Index

1. [`replit-deep-discovery.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/replit-deep-discovery.md)
   - Exhaustive analysis of Replit-specific platform internals, environment variables (`REPLIT_DB_URL`, `REPL_IDENTITY`, `REPLIT_DEV_DOMAIN`), pre-installed Replit binaries (`replit` CLI, `artifact-router`, `upm`, `prybar`), Connectors (`gh`, `gcloud`), and STS token minting.
2. [`latent-capabilities.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/latent-capabilities.md)
   - Secondary tools not in standard PATH: Python 3.13, TigerVNC desktop, X11 automation (`xdotool`), Poppler PDF toolkit, FFmpeg 6.1.2, ImageMagick 7, Semgrep SAST scanner, OSV-Scanner, Socket Security, and OpenBLAS/LAPACK.
3. [`installable-capabilities.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/installable-capabilities.md)
   - Complete `INSTALLABLE CAPABILITY CATALOG` covering package registries (npm, PyPI, Nix), Replit package firewall (`package-firewall.replit.local`), 1-day release delay security controls (`minimumReleaseAge`), and 15+ tool domains.
4. [`agent-infrastructure.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/agent-infrastructure.md)
   - Agent orchestration, process supervision (`pid1`/`pid2`, `nohup`), lifecycle hooks (`postMerge`, `postBuild`), task runners, and multi-agent topology options.
5. [`agent-relationships.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/agent-relationships.md)
   - Rigorous evaluation of the 15 primary agent interaction vectors (Shell, Filesystem, Network, Database, Browser, GitHub, Deployment, Background Process, Scheduled Job, External API, Other Agent, MCP Server, AI Model, Cloud Service, Preview/Webview).
6. [`api-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/api-ecosystem.md)
   - API servers, OpenAPI codegen (`orval`), Express 5, REST/GraphQL/gRPC/SSE capabilities, and STS-authenticated Replit APIs.
7. [`cloud-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/cloud-ecosystem.md)
   - Cloud SDKs (Google Cloud SDK `gcloud`, AWS CLI/SDK, Supabase, Cloudflare, Vercel), serverless deployment, and Docker containerization (`docker`, `dockerd-rootless`).
8. [`ai-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/ai-ecosystem.md)
   - Replit CLI `replit ai` Modelfarm gateway, OpenAI/Anthropic/Gemini SDKs, local Python AI runtimes, vector databases, and RAG architectures.
9. [`browser-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/browser-ecosystem.md)
   - Headless Playwright Chromium (with CJK font rendering), DOM inspection, automated screenshotting, PDF rendering, session state persistence, and TigerVNC visual desktop execution.
10. [`storage-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/storage-ecosystem.md)
    - Full storage matrix: Persistent Workspace Storage, Ephemeral `/tmp`, Serverless Key-Value DB (`REPLIT_DB_URL`), Local PostgreSQL (`helium:5432`), SQLite 3, and GCS App Storage.
11. [`network-ecosystem.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/network-ecosystem.md)
    - Advanced networking: HTTP/1.1, HTTP/2, HTTP/3 (via curl + ngtcp2), WebSockets, SSE, local HTTP/TCP servers, reverse proxying (`artifact-router`), Expo Ngrok tunnels, and public ingress routing (`REPLIT_DEV_DOMAIN`).
12. [`self-extension.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/self-extension.md)
    - `CAPABILITY EXPANSION MAP`: Step-by-step path for environment self-upgrade via runtime virtualenvs, NPM modules, binary builds, and MCP servers.
13. [`capability-combinations.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/capability-combinations.md)
    - 50 High-value synergistic capability combinations for autonomous engineering.
14. [`capability-graph.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/capability-graph.md)
    - Visual Mermaid dependency graph illustrating high-leverage nodes and execution pathways.
15. [`replit-research.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/replit-research.md)
    - Replit platform feature classification (DOCUMENTED, AVAILABLE, VERIFIED, NOT AVAILABLE, UNKNOWN).
16. [`missed-capabilities.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/missed-capabilities.md)
    - Comprehensive gap analysis highlighting the most significant Stage 1 omissions.
17. [`top-50.md`](file:///home/runner/workspace/environment-capability-audit/stage-2/top-50.md)
    - Ranked listings of the **Top 50 Most Powerful Capabilities** and **Top 50 Most Useful Capability Combinations**.
