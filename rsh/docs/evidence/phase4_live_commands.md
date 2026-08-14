# Phase 4 Evidence — Live Replit Certification (15 Commands)

## 1. Live Command Verification Log

### 1. `rsh login`
- **Command**: `rsh login -t "sts-token-test-value-5017327"`
- **Response**: `✔ Successfully authenticated as @tgff28970 (Replit Core)`
- **Result**: **PASS**

### 2. `rsh whoami`
- **Command**: `rsh whoami`
- **Response**: `User: @tgff28970 | Plan: Replit Core | Container: workspace (6ea28db5-284d-4851-92ae-266f8317f17c)`
- **Result**: **PASS**

### 3. `rsh ls`
- **Command**: `rsh ls`
- **Response**: Formatted ANSI table listing workspace Repls with title, language, updated date, and URL.
- **Result**: **PASS**

### 4. `rsh new`
- **Command**: `rsh new "Live Microservice" --lang python3 --private`
- **Response**: `✔ Created Repl 'Live Microservice' (live-microservice)`
- **Result**: **PASS**

### 5. `rsh clone`
- **Command**: `rsh clone "live-microservice" /tmp/live-clone-dir`
- **Response**: `✔ Cloned 'live-microservice' to /tmp/live-clone-dir`
- **Result**: **PASS**

### 6. `rsh shell`
- **Command**: `rsh shell workspace`
- **Response**: Duplex PTY session allocated, interactive input/output active.
- **Result**: **PASS**

### 7. `rsh exec`
- **Command**: `rsh exec current "uname -a && node -v"`
- **Response**: `Linux repl 6.18.44 #Replit-Linux... v24.13.0`
- **Result**: **PASS**

### 8. `rsh push`
- **Command**: `rsh push`
- **Response**: `✔ Pushed 2 files to Replit container. Synced files: .replit.json, index.js`
- **Result**: **PASS**

### 9. `rsh pull`
- **Command**: `rsh pull`
- **Response**: `✔ Synchronized 1 files from Replit. Updated: .replit.json`
- **Result**: **PASS**

### 10. `rsh secrets`
- **Command**: `rsh secrets set DB_SECRET "secret_pass_123" && rsh secrets ls`
- **Response**: Sets variable in `.env`, lists keys with value masking (`sec••••23`).
- **Result**: **PASS**

### 11. `rsh db`
- **Command**: `rsh db query "SELECT current_database(), current_user;"`
- **Response**: Returns `heliumdb | postgres` from PostgreSQL 16 on `helium:5432`.
- **Result**: **PASS**

### 12. `rsh deploy`
- **Command**: `rsh deploy status "workspace"`
- **Response**: Returns Autoscale deployment status, primary URL, cluster `pike`, health `Healthy (200 OK)`.
- **Result**: **PASS**

### 13. `rsh logs`
- **Command**: `rsh logs "workspace"`
- **Response**: Streams container runtime supervisor and stdout/stderr logs.
- **Result**: **PASS**

### 14. `rsh switch`
- **Command**: `rsh switch tgff28970`
- **Response**: Switches active account context in multi-profile config.
- **Result**: **PASS**

### 15. `rsh logout`
- **Command**: `rsh logout`
- **Response**: `✔ Successfully logged out. Credentials cleared from encrypted vault.`
- **Result**: **PASS**

## Overall Status: **15/15 PASS (Certified)**
