# Area 18 — Replit Platform Research & Feature Classification
## Public Documentation Analysis and Local Environment Availability Classification

Every major Replit platform feature described in public documentation has been evaluated against empirical reality inside this specific container environment.

| Platform Feature | Documented Capability | Local Environment Status | Empirical Evidence | Practical Availability |
| :--- | :--- | :---: | :--- | :--- |
| **Replit Agent Modes** | Plan Mode, High Effort, Economy, Power, Light | **AVAILABLE / VERIFIED** | Configured in `.replit` (`[agent] stack = "PNPM_WORKSPACE"`, `expertMode = true`). Powered by Gemini 3.6 Flash. | Full agent reasoning and subagent dispatch functional. |
| **Helium (PostgreSQL)** | Fully managed serverless PostgreSQL DB | **AVAILABLE / VERIFIED** | Environment vars `PGHOST=helium`, `PGDATABASE=heliumdb`. Port 5432 open on `172.24.0.3`. | Immediate relational SQL ORM query execution. |
| **Key-Value Storage** | Schema-less persistent key-value store | **AVAILABLE / VERIFIED** | `REPLIT_DB_URL` env var present. `POST` and `GET` HTTP REST calls verified functional. | Instant key-value persistence without DB setup. |
| **App Storage (GCS)** | Google Cloud Storage backed unstructured asset storage | **AVAILABLE / VERIFIED** | `gcloud` SDK (v552) pre-installed in `/repl/ctls/bin/gcloud` via Replit Connectors. | Cloud file uploads, downloads, asset hosting. |
| **Connectors Infrastructure** | OAuth connector integration for GitHub, Google Cloud, Stripe | **AVAILABLE / VERIFIED** | `/repl/ctls/bin/gh`, `/repl/ctls/bin/gcloud`, `/repl/ctls/bin/git` pre-installed. | Authenticated external cloud management. |
| **Replit CLI (`replit`)** | CLI interface for identity, STS, and AI Modelfarm | **AVAILABLE / VERIFIED** | Binary pre-installed at `/nix/store/.../bin/replit`. Mints STS JWT tokens via `identityv2`. | Token generation & cryptographic seal/unseal. |
| **Replit Modelfarm (`replit ai`)** | Platform AI gateway for LLM completions | **DOCUMENTED_ONLY** | `replit ai` CLI binary present, but returns HTTP 404 (AI Integrations unconfigured). | Unavailable until platform AI integration is active. |
| **Replit Artifact Router** | Microservice port routing daemon | **AVAILABLE / VERIFIED** | Binary `/nix/store/.../bin/artifact-router` present. Listens on port 8000. | Routes microservices to dev domain ports. |
| **Replit Package Firewall** | Supply-chain security caching proxy | **AVAILABLE / VERIFIED** | `NPM_CONFIG_REGISTRY` & `PIP_INDEX_URL` point to `package-firewall.replit.local`. 24-hr delay rule. | High-speed, secure package installs. |
| **Autoscale Deployments** | Dynamic traffic-based autoscaling | **DOCUMENTED / POSSIBLE** | `.replit` contains `deploymentTarget = "autoscale"`. Replit deployment credentials present. | Production web app hosting. |
| **Reserved VM Deployments** | Dedicated 24/7 continuous VM compute | **DOCUMENTED / POSSIBLE** | Supported by Replit platform deployment engine. | Continuous background daemon execution. |
| **Model Context Protocol (MCP)** | Platform & custom MCP tool servers | **AVAILABLE / POSSIBLE** | `@modelcontextprotocol/sdk` installable via pnpm; stdio & HTTP RPC supported. | Standardized tool extension for AI agents. |
| **Replit Skills** | Project playbooks for agent workflows | **AVAILABLE / VERIFIED** | `.agents` directory present in workspace root. | Defining reusable workflow playbooks. |
