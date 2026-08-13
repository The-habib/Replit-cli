# Area 22 — Ranked Catalog of Hidden System Superpowers
## Top 15 Hidden Capabilities Discovered in Advanced Container Audits

The following catalog ranks the highest-leverage hidden capabilities uncovered across the container environment:

1. **`rippkgs` Sub-Millisecond Nix Store Search**: Rust-powered local SQLite index (`rippkgs-index.sqlite`) enabling instant package discovery without network delays.
2. **Replit STS v2 Token Generator (`replit identityv2`)**: Programmatic RS256 JWT minting from `https://sts.replit.com` for cryptographically verified service-to-service auth.
3. **Replit Dynamic Linker Audit Engine (`rtld_loader.so`)**: Injected via `REPLIT_LD_AUDIT=1` to intercept dynamic library resolution and dynamically link binaries across `/nix/store` hashed paths.
4. **Replit Package Firewall JSON Registry API**: Programmatic REST API endpoints at `http://package-firewall.replit.local/npm/` for version tag auditing and tarball resolution.
5. **TigerVNC Server & X11 GUI Input Automation**: Spawns virtual graphical X11 display `:1` (`Xvnc`) and automates keyboard/mouse input via `xdotool`.
6. **Pre-installed Playwright Chromium Engine (v140)**: Pre-compiled Chromium browser with CJK font support for headless DOM scraping, screenshotting, and PDF rendering.
7. **Semgrep SAST Security Scanner (v1.152.0)**: Industrial static analysis security testing engine pre-installed to audit codebases across 30+ programming languages.
8. **Google OSV Vulnerability Scanner (`osv-scanner`)**: Scans package lockfiles against Google OSV database for real-time security auditing.
9. **Socket Supply-Chain Security Scanner (`socket`)**: Audits NPM and PyPI dependencies for malware, typosquatting, and supply-chain attacks.
10. **Replit Key-Value Storage REST API (`REPLIT_DB_URL`)**: Authenticated HTTPS REST API providing schema-less persistent key-value storage.
11. **Helium Serverless PostgreSQL Database (`helium:5432`)**: Preconfigured PostgreSQL 16 server with `postgis`, `uuid-ossp`, and `pg_trgm` extensions active.
12. **Poppler PDF Rendering Suite (`pdftoppm` / `pdftotext`)**: Extracts text, converts PDF pages to high-resolution PNG/JPEG images, and splits/merges PDF files.
13. **FFmpeg 6.1.2 Multimedia Transcoding Suite**: Professional video and audio processing, frame extraction, clipping, and stream re-encoding.
14. **ImageMagick 7 Image Suite (`magick`)**: High-performance image manipulation, format conversion, resizing, cropping, and text watermarking.
15. **OpenVSCode Server (`openvscode-server`)**: Headless VS Code IDE server supporting remote web-based code editing and Language Server Protocols (LSP).
