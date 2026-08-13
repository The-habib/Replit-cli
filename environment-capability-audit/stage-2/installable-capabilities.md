# Area 4 — Package Ecosystem Capability Discovery
## Registries, Security Rules, and Installable Capability Catalog

### 1. Available Registries & Security Firewall Controls

This environment has access to all major package distribution networks, routed through an internal high-speed Replit caching firewall:

1. **NPM Registry**: `http://package-firewall.replit.local/npm/` (Configured in `.npmrc`, `NPM_CONFIG_REGISTRY`, `YARN_REGISTRY`).
2. **PyPI Registry**: `http://package-firewall.replit.local/pypi/simple/` (Configured in `PIP_INDEX_URL`, `PIP_TRUSTED_HOST`).
3. **Nix Package Channel**: Nix legacy channel (`/home/runner/.nix-defexpr/channels`).
4. **Go Modules**: Standard HTTPS proxy (`proxy.golang.org`).
5. **Crates.io**: Cargo package repository access via standard HTTPS network connectivity.

#### Supply-Chain Security Defense Rule
In `pnpm-workspace.yaml`, Replit enforces a critical security protection:
```yaml
minimumReleaseAge: 1440 # 24 hours (1440 minutes)
```
- **Function**: Any npm package version published within the last 24 hours is blocked by default to prevent zero-day supply-chain compromises.
- **Exceptions**: Scoped `@replit/*` packages are exempted.

---

### 2. Installable Capability Catalog

The following catalog lists high-value packages available for immediate installation via `pnpm`, `pip`, or `nix`:

| Package Name | Registry | Primary Purpose | Size Est. | Dependencies | Requires Auth? | Potential Capability | Safe to Install? | Why It Matters |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :---: | :--- |
| `@modelcontextprotocol/sdk` | npm | Model Context Protocol (MCP) server & client construction | ~5MB | `@types/node` | No | Enables agent to run or connect to standardized MCP tool servers | **YES** | Key protocol for AI agent tool integration |
| `openai` / `@anthropic-ai/sdk` | npm / PyPI | Direct API client for OpenAI / Anthropic models | ~8MB | `fetch` / `httpx` | **Yes (API Key)** | Direct LLM reasoning, code generation, vision API calls | **YES** | Allows agent to query frontier AI models |
| `@google/genai` | npm / PyPI | Gemini 2.5/3 API integration | ~6MB | `fetch` / `httpx` | **Yes (API Key)** | Gemini multimodal text, vision, and code generation | **YES** | Google AI SDK integration |
| `playwright` | npm | Full browser automation wrapper | ~15MB | `playwright-core` | No | End-to-end browser execution, DOM manipulation, screenshotting | **YES** | Works with pre-installed Chromium binary |
| `@aws-sdk/client-s3` | npm | AWS S3 object storage operations | ~12MB | `@smithy/types` | **Yes (AWS Keys)** | Remote cloud file upload, download, bucket listing | **YES** | Cloud storage persistence |
| `@supabase/supabase-js` | npm | Supabase BaaS (Postgres, Auth, Realtime) | ~7MB | `cross-fetch` | **Yes (Supabase Key)** | Relational DB & vector store management | **YES** | Cloud DB integration |
| `express` (v5.2.1) | npm | Web application framework | ~3MB | `body-parser`, `qs` | No | REST API endpoints, webhooks, static file serving | **YES** | Core backend framework |
| `drizzle-orm` | npm | TypeScript ORM for SQL | ~4MB | None | No | Type-safe schema builder & query generator for Helium DB | **YES** | Pre-installed in catalog |
| `sharp` | npm | High-performance image processing | ~25MB | `libvips` | No | Resize, crop, convert WebP/PNG/JPEG images in Node.js | **YES** | Fast image pipeline |
| `pdf-lib` | npm | PDF creation & modification | ~5MB | None | No | Generate custom PDF reports, fill forms, merge PDFs | **YES** | Pure JS PDF manipulation |
| `cheerio` | npm | Fast HTML parsing & DOM querying | ~2MB | `htmlparser2` | No | Server-side web scraping without heavy browser execution | **YES** | Light web scraping |
| `fastapi` + `uvicorn` | PyPI | Python async web framework | ~10MB | `pydantic`, `starlette` | No | Python REST API servers, WebSocket endpoints | **YES** | Python backend server |
| `numpy` / `pandas` | PyPI / Nix | Data analysis & tensor manipulation | ~40MB | C libraries | No | Numerical computation, CSV/Parquet processing | **YES** | Pre-compiled wheels in Nix |
| `chromadb` / `hnswlib-node` | PyPI / npm | In-memory Vector Database | ~30MB | C++ bindings | No | Vector embeddings storage, semantic search, RAG | **YES** | Local RAG vector index |
| `vitest` | npm | Fast TypeScript test runner | ~15MB | `vite`, `esbuild` | No | Unit testing, integration testing, code coverage | **YES** | Automated test runner |
