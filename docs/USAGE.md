# Complete Command Reference & Usage Guide — `rsh`

## 1. Authentication

### Check Current User & Container Context
```bash
rsh whoami
rsh whoami --json
```

### Log In
```bash
# Interactive prompt
rsh login

# Direct session cookie
rsh login --sid "s%3Ayour-session-cookie-here"

# Direct API token
rsh login --token "your-api-token"
```

### Log Out
```bash
rsh logout
```

---

## 2. Project Management

### List Projects
```bash
rsh ls
rsh ls --user username
rsh ls --json
```

### Create a New Project
```bash
rsh new "My App"
rsh new "Web Scraper" --lang python3
rsh new "Secret API" --lang nodejs --private
```

### Rename a Project
```bash
rsh rename my-app "Renamed App"
```

### Delete a Project
```bash
rsh delete my-app
rsh delete my-app --yes
```

### Import GitHub Repository
```bash
rsh import https://github.com/expressjs/express express-app
```

### Open in Browser
```bash
rsh open my-app
```

---

## 3. Remote Shell & Execution

### Open Interactive Container Shell
```bash
# Connect to a remote Repl container
rsh shell my-app

# Without arguments, opens interactive project picker
rsh shell
```

### Execute a Single Command (Non-Interactive)
```bash
rsh exec my-app "npm install express"
rsh exec my-app "python3 -m unittest"
```

---

## 4. Code Synchronization

### Clone a Project Locally
```bash
rsh clone my-app ./my-app-dir
```

### Pull Latest Changes
```bash
cd my-app-dir
rsh pull
```

### Push Local Files to Container
```bash
cd my-app-dir
rsh push
```

### Run and Restart Main Process
```bash
rsh run my-app
rsh restart my-app
```

---

## 5. Secrets, Databases & Environment

### Project Secrets Management
```bash
rsh secrets ls
rsh secrets ls --show-values
rsh secrets set API_KEY "sk_live_123456"
rsh secrets rm API_KEY
```

### Database Connectors (PostgreSQL / SQLite)
```bash
rsh db info
rsh db query "SELECT tablename FROM pg_tables WHERE schemaname = 'public';"
```

### View Environment
```bash
rsh env
rsh env --all
```

---

## 6. User Preferences & Shell Autocompletion

### Configuration
```bash
rsh config ls
rsh config get editor
rsh config set editor nvim
rsh config set defaultRepl "my-main-repl"
```

### Shell Completions
```bash
# Bash completion setup
source <(rsh completions bash)

# Zsh completion setup
source <(rsh completions zsh)
```

---

## 7. AI Coding Workflows

### Ask Questions About Code / Terminal Errors
```bash
rsh ask "How do I add CORS support to this express app?"
rsh ask "Why is port 3000 giving EADDRINUSE?"
```

### Autonomous AI Agent
```bash
rsh agent "Implement authentication middleware with JWT"
rsh agent "Write unit tests for the user model"
```
