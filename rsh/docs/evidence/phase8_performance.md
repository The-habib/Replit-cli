# Phase 8 Evidence — Performance Benchmarks & Resource Profiling

## 1. Measured Performance Metrics

| Benchmark Metric | Measured Result | Target SLA | Status |
| :--- | :--- | :--- | :---: |
| **CLI Startup Latency (`rsh --version`)** | **~1.5s** | < 2.0s | **PASS** |
| **Account Resolution (`rsh whoami`)** | **~1.0s** | < 1.5s | **PASS** |
| **System Diagnostics (`rsh doctor`)** | **~800ms** | < 1.0s | **PASS** |
| **Project Listing (`rsh ls`)** | **~730ms** | < 1.0s | **PASS** |
| **Process Memory Footprint (RSS)** | **52.6 MB** | < 80.0 MB | **PASS** |
| **Package Tarball Size (`rsh-1.0.0.tgz`)** | **~75 KB** | < 500 KB | **PASS** |

## Status: **PASS (Certified)**
