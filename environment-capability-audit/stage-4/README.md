# Deep Replit Capability Discovery — Stage 4 Binary Reverse Engineering
## Deep Binary Disassembly, MicroVM VSOCK Architecture, Dynamic Linker Auditing, and Socket Protocol Reverse Engineering

This directory contains the **Stage 4 Binary & Architecture Reverse Engineering Report**. Using powerful native analysis tools—including GNU Binutils (`readelf`, `nm`, `strings`, `objdump`), dynamic linker symbol inspection (`LD_AUDIT`), UNIX domain socket probing, and AST analysis—this research uncovers the underlying lower-level mechanisms governing the Replit container environment.

---

## 📊 Summary of Reverse Engineering Discoveries

| Subsystem | Reverse-Engineered Architecture | Primary Binary / File | Mechanism |
| :--- | :--- | :--- | :--- |
| **MicroVM VSOCK Mesh** | Dual-PID Init & VSOCK Channel Layout | `/nix/store/...-pid1-0.0.1/bin/pid1` (56MB Go static binary) | VSOCK ports 2000 (`conman`), 2001 (`pid2`), 2002 (`host-services`), 2003 (`portauthority`). |
| **`conman` gRPC RPC Engine** | MicroVM Container Management Protocol | Embedded in `pid1` binary | Methods: `GetExternalSecrets`, `SetExternalSecrets`, `MintIdentityToken`, `PersistFilesystem`, `ResetNixFilesystem`, `RunHousekeepingSQL`. |
| **Dynamic Linker Audit (`LD_AUDIT`)** | Dynamic Library Interception Engine | `/nix/store/.../rtld_loader.so` | Injected via `REPLIT_LD_AUDIT=1` using glibc dynamic loader hooks (`la_version`, `la_objsearch`, `la_objopen`, `la_preinit`). Reads `REPLIT_LD_LIBRARY_PATH`. |
| **Replit CLI Binary Architecture** | Native Go Platform CLI | `/nix/store/.../bin/replit` | Supports STS JWT token creation (`identityv2`), NaCl box encryption/decryption (`seal`/`unseal`), and Modelfarm AI completions (`ai`). |
| **Process Supervisor (`pid2`)** | Node.js Process & Socket Manager | `/mnt/pid2/server.cjs` | Manages child process spawning, socket listeners, ping sockets (`pid2ping.0.sock`), and WebSocket tunnels (`pid2ws.sock`). |
| **PortAuthority Socket Routing** | Port Discovery & Ingress Forwarder | `/run/replit/socks/portauthority.sock` | Listens on vsock port 2003 and UNIX domain sockets to map internal microservice ports to public dev domain routing. |

---

## 🗺️ Stage 4 Document Index

1. [`microvm-vsock-architecture.md`](file:///home/runner/workspace/environment-capability-audit/stage-4/microvm-vsock-architecture.md)
   - Deep structural analysis of the Replit microVM init process (`pid1`), VSOCK ports (2000, 2001, 2002, 2003), and `conman` gRPC RPC specifications.
2. [`rtld-loader-reverse-engineering.md`](file:///home/runner/workspace/environment-capability-audit/stage-4/rtld-loader-reverse-engineering.md)
   - Reverse engineering of `rtld_loader.so`, `REPLIT_LD_AUDIT`, glibc dynamic linker audit hooks, and `REPLIT_LD_LIBRARY_PATH` resolution.
3. [`binary-disassembly-audit.md`](file:///home/runner/workspace/environment-capability-audit/stage-4/binary-disassembly-audit.md)
   - ELF header analysis, dynamic symbol tables (`nm -D`), hardcoded endpoints, and binary breakdown for `replit` CLI, `pid1`, `artifact-router`, and `openvscode-server`.
4. [`unix-sockets-protocol.md`](file:///home/runner/workspace/environment-capability-audit/stage-4/unix-sockets-protocol.md)
   - Protocol specification and empirical probing of `/run/replit/seccomp.sock`, `/run/replit/socks/pid2ping.0.sock`, `/run/replit/socks/pid2ws.sock`, and `/run/replit/socks/portauthority.sock`.
