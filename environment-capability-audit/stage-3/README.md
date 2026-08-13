# Deep Replit Capability Discovery — Stage 3 Empirical Verification
## Live Reverse-Engineering, Active Protocol Probing, and Empirical Proof Matrix

This directory contains the **Stage 3 Active Empirical Reverse-Engineering & Verification Report**. Every feature, API, daemon, binary tool, and protocol listed below was executed live inside this container environment with empirical console proof.

---

## 📊 Empirical Verification Summary

| Subsystem / Protocol | Verification Method | Status | Live Output Evidence |
| :--- | :--- | :---: | :--- |
| **Replit STS Token Generation (`identityv2`)** | Executed `replit identityv2 create --audience api.custom.service` | **VERIFIED** | Minted valid RS256 JWT signed by `https://sts.replit.com` with claims `sandbox_id`, `customer_id`, `org_id`. |
| **Replit Cryptographic Identity (`REPL_IDENTITY`)** | NaCl public key validation | **VERIFIED** | Verified Repl ID validation (`6ea28db5-284d-4851-92ae-266f8317f17c`) during token validation. |
| **Replit Key-Value Storage REST API** | Tested POST, GET, PREFIX SEARCH (`?prefix=stage3_`), DELETE against `REPLIT_DB_URL` | **VERIFIED** | `POST` -> HTTP 200, `GET` -> JSON object retrieved, `PREFIX` -> Listed keys, `DELETE` -> HTTP 204. |
| **PostgreSQL 16 Helium Server (`helium:5432`)** | `psql` query catalog, `CREATE TABLE`, `INSERT`, `SELECT`, `DROP TABLE` | **VERIFIED** | PostgreSQL 16.10 on `helium:5432` compiled by Clang 19.1.7. Extensions `postgis`, `uuid-ossp`, `pg_trgm` active. |
| **Playwright Chromium Engine (v140)** | Executed `REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE` headless rendering | **VERIFIED** | Rendered HTML with CJK fonts -> Saved 33.4KB PNG screenshot & 58.0KB PDF document to `/tmp`. |
| **Poppler PDF Rendering Suite** | Executed `pdftotext`, `pdfinfo`, `pdftoppm` | **VERIFIED** | Extracted text from PDF, retrieved Skia/PDF m140 metadata, rasterized Page 1 to 34KB PNG. |
| **ImageMagick 7 Media Suite** | Executed `magick -resize` on PNG image | **VERIFIED** | Converted Poppler PNG rasterization into a 4.2KB WebP thumbnail file. |
| **FFmpeg 6.1.2 Video Generator** | Generated synthetic H.264 video with `ffmpeg`, queried `ffprobe` | **VERIFIED** | Created 2.0s MP4 video clip (`duration=2.000000`, `bit_rate=52668`). |
| **TigerVNC & X11 GUI Input Automation** | Started `Xvnc :1`, queried root window via `xwininfo`, executed `xdotool` input | **VERIFIED** | `Xvnc` spawned display `:1` (Root window `0x22b`), `xdotool` executed mousemove, click, and Return keys. |
| **OSV-Scanner Vulnerability Auditor** | Executed `osv-scanner scan --lockfile pnpm-lock.yaml` | **VERIFIED** | Scanned 466 packages in 14.9ms, reported vulnerabilities in `brace-expansion`, `esbuild`, `fast-uri`, `js-yaml`, `nanoid`. |
| **Model Context Protocol (MCP)** | Built live Node.js MCP JSON-RPC server via stdio | **VERIFIED** | Handled `initialize` (v2024-11-05), `tools/list`, and `tools/call` requests with JSON-RPC responses. |
| **Python 3.13 FastAPI Server** | Built virtualenv, installed `fastapi` & `uvicorn`, served HTTP on port 5892 | **VERIFIED** | `uvicorn` server started -> `curl GET` returned `{'status':'SUCCESS','replit_verified':True}`. |

---

## 🗺️ Stage 3 Document Index

1. [`replit-reverse-engineering.md`](file:///home/runner/workspace/environment-capability-audit/stage-3/replit-reverse-engineering.md)
   - Deep protocol reverse-engineering of Replit STS tokens, NaCl box identity tokens, Key-Value Storage HTTP REST endpoints, Helium PostgreSQL catalog internals, microVM supervision, and Package Firewall rules.
2. [`empirical-verification-log.md`](file:///home/runner/workspace/environment-capability-audit/stage-3/empirical-verification-log.md)
   - Complete verbatim test logs and execution outputs for all 12 live experiments.
