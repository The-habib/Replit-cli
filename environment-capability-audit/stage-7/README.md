# Deep Replit Capability Discovery — Stage 7 Native Compilation & Language Servers
## Native GCC 14.3 C++ Compilation, Language Server Protocol (LSP), and Real-Time AST Diagnostics

This directory contains the **Stage 7 Native Compilation & Language Server Infrastructure Report**. Stage 7 completes the technical capability discovery by verifying native C++ binary compilation and Language Server Protocol (LSP) diagnostics.

---

## 📊 Summary of Stage 7 Capabilities

| Subsystem / Capability | Binary / Path | Version / Standard | Empirical Test Result |
| :--- | :--- | :--- | :--- |
| **GNU C++ Compiler (`g++`)** | `/nix/store/3mb5pci3.../bin/g++` | GCC `14.3.0` (C++23) | **VERIFIED** — Compiled C++ source file using `<vector>` & `<numeric>` -> Executed binary `/tmp/stage7_test_bin` returning `Sum=100`. |
| **TypeScript Language Server (`tsserver`)** | `/home/runner/workspace/node_modules/typescript/lib/tsserver.js` | TypeScript `5.9.3` | **VERIFIED** — Spawns background AST diagnostic worker and typings installer process (`typingsInstallerPid`). |
| **TOML Language Server (`taplo`)** | `/nix/store/qq4mijbp.../bin/taplo` | Taplo LSP `0.patched` | **VERIFIED** — Background LSP daemon running for real-time `.replit` and TOML configuration validation. |

---

## 🗺️ Stage 7 Document Index

1. [`native-compilation-and-lsp.md`](file:///home/runner/workspace/environment-capability-audit/stage-7/native-compilation-and-lsp.md)
   - Deep structural specification of GCC 14.3 native binary compilation, libstdc++ integration, and Language Server Protocol (LSP) daemon channels.
