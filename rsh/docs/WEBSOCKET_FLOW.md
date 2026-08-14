# Replit Container WebSocket & Crosis Flow Specification

## 1. Connection Handshake & Channel Negotiation

```
Client (rsh)                                             Goval Gateway (eval.repl.it)
    │                                                                  │
    │ 1. GET wss://eval.repl.it/wsv2/... [Protobuf Handshake]          │
    ├─────────────────────────────────────────────────────────────────►│
    │ 2. HTTP 101 Switching Protocols                                  │
    │◄─────────────────────────────────────────────────────────────────┤
    │                                                                  │
    │ 3. Send Channel 0: Connect { token: GovalToken }                 │
    ├─────────────────────────────────────────────────────────────────►│
    │ 4. Recv Channel 0: ContainerState { state: READY }               │
    │◄─────────────────────────────────────────────────────────────────┤
    │                                                                  │
    │ 5. Open Channel: OpenChan { id: 1, service: "exec" }             │
    ├─────────────────────────────────────────────────────────────────►│
    │ 6. Recv: OpenChanRes { id: 1, state: CREATED }                   │
    │◄─────────────────────────────────────────────────────────────────┤
    │                                                                  │
    │ 7. Send: Exec { args: ["/bin/bash", "-l"], env: { TERM: ... } } │
    ├─────────────────────────────────────────────────────────────────►│
    │ 8. Send: ResizeTerm { rows: 24, cols: 80 }                       │
    ├─────────────────────────────────────────────────────────────────►│
    │                                                                  │
    │ ◄────────── Duplex Interactive Stream (Input / Output) ────────► │
    │                                                                  │
    │ 9. Terminal Resize Event: ResizeTerm { rows: 35, cols: 120 }     │
    ├─────────────────────────────────────────────────────────────────►│
    │ 10. Process Exit: ExitCodeEvent { code: 0 }                      │
    │◄─────────────────────────────────────────────────────────────────┤
    │ 11. Close Channel: CloseChan { id: 1 }                           │
    ├─────────────────────────────────────────────────────────────────►│
```

---

## 2. Wire Command Encodings (`@replit/protocol`)

### 2.1 PTY Channel Command Formats
1. **Interactive Keyboard Input**:
   ```json
   {
     "channel": 1,
     "input": "ls -la\r"
   }
   ```
2. **Terminal Stream Output**:
   ```json
   {
     "channel": 1,
     "output": "total 48\ndrwxr-xr-x 1 runner runner 4096 ..."
   }
   ```
3. **Terminal Resize (`SIGWINCH`)**:
   ```json
   {
     "channel": 1,
     "resizeTerm": {
       "rows": 32,
       "cols": 110
     }
   }
   ```
4. **Interruption Signal (`Ctrl+C`)**:
   Sends raw character byte `\x03` over the input stream to trigger `SIGINT` on the child process inside the container.
