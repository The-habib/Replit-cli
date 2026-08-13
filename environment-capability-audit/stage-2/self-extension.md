# Area 17 — Self-Extension Architecture
## Capability Expansion Map and Environment Upgrade Pathways

### 1. Capability Expansion Pathways Diagram

```mermaid
graph TD
    Layer1[Layer 1: Base Container Environment] --> Layer2[Layer 2: Runtime Package Installation]
    Layer2 --> Layer3[Layer 3: System Tooling & Nix Packages]
    Layer3 --> Layer4[Layer 4: MCP & Agent Skill Expansion]
    Layer4 --> Layer5[Layer 5: Autonomous Microservices & Tunnels]

    Layer1 --> L1_Caps[Node 24 / Python 3.13 / Chromium 140 / Postgres]
    Layer2 --> L2_Caps[pnpm add @modelcontextprotocol/sdk / pip install openai]
    Layer3 --> L3_Caps[upm add / nix-env -i / custom binary builds]
    Layer4 --> L4_Caps[Custom MCP Tool Servers / Agent Skills]
    Layer5 --> L5_Caps[Background Daemons / Public HTTPS Endpoints]
```

---

### 2. Capability Expansion Taxonomy Matrix

| Expansion Tier | Mechanism / Command | Example Action | Unlocked New Capability | Safe? |
| :--- | :--- | :--- | :--- | :---: |
| **Tier 1: Base Environment** | Built-in PATH & Nix binaries | Call pre-installed Chromium 140, Python 3.13, FFmpeg | Visual web scraping, PDF parsing, video editing | **YES** |
| **Tier 2: Package Ecosystem** | `pnpm add <pkg>` / `pip install <pkg>` | Install `@modelcontextprotocol/sdk` or `openai` | Model Context Protocol servers, LLM integration | **YES** |
| **Tier 3: System Package** | `upm add <pkg>` / `nix-env -i <pkg>` | Install `caddy`, `ripgrep`, `tesseract` | Reverse proxying, fast code search, OCR | **YES** |
| **Tier 4: Custom Binary Build** | `gcc` / `make` / `cargo` | Build C/Rust custom tooling from source | Special native protocol drivers or high-speed binary tools | **YES** |
| **Tier 5: Skill & MCP System** | Project `.agents` / MCP server | Register new MCP tool definitions in workspace | Expanding agent toolset dynamically during execution | **YES** |
| **Tier 6: Daemon / Worker** | `nohup` / `pnpm run dev` / `artifact-router` | Start background Express server on port 5000 | Exposing public webhook receivers & API backends | **YES** |
