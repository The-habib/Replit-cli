# Deliverable 04 — Prior-Art Analysis & Anti-Hype Elimination

**Laboratory Identifier**: Autonomous Frontier Technology Research Lab  
**Compliance Standard**: Strict Anti-Hype Vocabulary Rule (Evidence-Based Taxonomy)  

---

## 1. Taxonomic Classification of Prior Art

To maintain rigorous scientific standards, candidate hypotheses are systematically compared against historical and contemporary prior art across 6 main lineages:

```
[1. Formal Verification] ──► Proof-Carrying Code (Necula '96), Dafny, F*, Liquid Haskell, Z3 SMT
[2. Content Addressing]   ──► Unison Language (AST hashing), Nix Store (input hashing), IPFS
[3. Capability Security] ──► E Language, Capsicum, Deno permissions, Object Capabilities (OCaps)
[4. WASM & Sandboxing]   ──► Wasmtime, WASI-nn, Gramine, Risc0 ZKVM, Cairo VM
[5. Software Supply Chain]──► SLSA provenance, Sigstore, Nix Flakes, Cargo lockfiles
[6. AI Tool & RPC Interfaces]► Model Context Protocol (MCP), OpenAPI / JSON-RPC, LangChain
```

---

## 2. Evidence-Based Prior Art Evaluation Matrix

Each candidate hypothesis is subjected to prior-art elimination. Under the **Anti-Hype Rule**, we forbid non-evidenced claims of absolute novelty and evaluate structural differentiation.

| Candidate ID & Name | Existing Prior Art Discovered | Overlap / Similarity | Key Failure Mode of Prior Art | Evolutionary Differentiation Status |
| :--- | :--- | :--- | :--- | :--- |
| **HYP-001**: Proof-Carrying Intent Contracts (PCIC) | Proof-Carrying Code (Necula 1996), Dafny (Microsoft), F* (Inria/MSR), Liquid Haskell. | High overlap in verification condition generation via SMT solvers. | **Manual Proving & Instability**: Traditional PCC required manual annotation or hit SMT solver timeouts. PCC was static and un-composable across dynamic runtime synthesis. | **Appears Differentiated**: Combines SMT proof certificates with runtime-synthesized AI implementations and content-addressed contract registries. |
| **HYP-041**: Content-Addressed Capability Registry (CACR) | Unison Language (AST hashing), Nix (`/nix/store` hashing), IPFS DHT, OCI Artifact Registries. | Substantial overlap with Unison's AST hashing and Nix's input hash addressing. | **Name/Package Coupling**: Unison binds hashes strictly to single AST node implementations; Nix binds hashes to build inputs. Neither indexes by *behavioral contracts* independent of implementation code. | **Appears Differentiated**: Indexes software by SMT-validated pre/post-conditions, allowing multiple interchangeable implementations for a single contract hash. |
| **HYP-011**: Attested Evidence-Native Runtime (AENR) | Wasmtime WASI sandbox, Gramine SGX, Risc0 ZKVM, Cairo VM, Proof-Carrying Binary. | High overlap with ZK-VM execution proofs and SGX enclave attestation. | **High Proving Overhead / Micro-Latency**: ZK-VMs (Risc0) introduce 10,000x compilation overhead; SGX requires proprietary hardware. Neither provides microsecond-level local proof checks for micro-capabilities. | **Similar Systems Exist / Differentiated**: Optimizes lightweight SMT property certificates validated in <1ms inside Wasm sandboxes. |
| **HYP-021**: Dynamic Implementation Substitution (DIS) | Dynamic Link Libraries (DLL/SO), Polymorphic interfaces, Feature flags, OSGi module swapping. | Substantial overlap with dynamic linking and OOP interface polymorphism. | **Lack of Verified Safety Guarantees**: Swapping dynamic libraries at runtime often breaks unexpected invariants, causing runtime segfaults or subtle logic corruption. | **Appears Differentiated**: Swaps implementations strictly under SMT contract invariant gates with automated zero-downtime regression rollbacks. |
| **HYP-051**: Deterministic Neural Executable Protocol | Structured Output JSON, Outlines, Instructor, Guardrails AI, Guidance. | Substantial overlap with LLM schema constrained generation. | **Text-Level Constraining Only**: Existing tool wrappers (MCP / Guardrails) constrain JSON text strings, but do not verify state machine invariants or execution semantics. | **Appears Differentiated**: Bridges neural outputs directly to compiled WebAssembly state machines with SMT execution certificates. |

---

## 3. Discarded & Eliminated Hypotheses (Failed Prior-Art Test)

The following candidates were rejected or downgraded during initial screening:

1. **HYP-053 (Agent-Native RPC Protocol)**: *Rejected*. Substantial overlap with gRPC, Cap'n Proto, and MCP. Adding "token cost awareness" to JSON-RPC is an incremental wrapper, not a missing computational primitive.
2. **HYP-007 (First-Class Dynamic Capability Dispatch)**: *Downgraded*. Highly similar to objective-C dynamic message sending and Smalltalk method missing protocols.
3. **HYP-045 (Decentralized P2P Artifact Graph)**: *Rejected*. Substantial overlap with IPFS, Dat protocol, and BitTorrent package mirrors.
4. **HYP-065 (Zero-Config Hermetic Toolchain)**: *Rejected*. Almost identical to Nix Flakes + Devenv.sh.

---
EOF
