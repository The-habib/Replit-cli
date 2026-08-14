# Replit API Map & Protocol Specification

## 1. GraphQL Endpoints & Operations

### Gateway Endpoint
`POST https://replit.com/graphql`

### Core Queries & Mutations

#### 1. `CurrentUser`
```graphql
query CurrentUser {
  currentUser {
    id
    username
    email
    name
    bio
    image
    isSubscribed
    plan {
      id
      name
    }
  }
}
```

#### 2. `UserRepls`
```graphql
query UserRepls($username: String!, $count: Int, $after: String) {
  userByUsername(username: $username) {
    id
    username
    repls(count: $count, after: $after) {
      items {
        id
        title
        slug
        url
        isPrivate
        timeCreated
        timeUpdated
        language
        description
      }
      pageInfo {
        hasNextPage
        nextCursor
      }
    }
  }
}
```

#### 3. `ReplByUrlInfo`
```graphql
query ReplByUrlInfo($url: String!) {
  replByUrlInfo(url: $url) {
    id
    title
    slug
    url
    isPrivate
    language
    user {
      id
      username
    }
  }
}
```

#### 4. `CreateRepl`
```graphql
mutation CreateRepl($input: CreateReplInput!) {
  createRepl(input: $input) {
    ... on Repl {
      id
      title
      slug
      url
      language
      isPrivate
    }
    ... on UserError {
      message
    }
  }
}
```

#### 5. `DeleteRepl`
```graphql
mutation DeleteRepl($id: String!) {
  deleteRepl(id: $id) {
    id
  }
}
```

---

## 2. Goval / Crosis Connection Metadata API

To initiate a Crosis WebSocket connection to a Repl container, the client queries connection metadata:
- **Endpoint Pattern**: `POST https://replit.com/graphql` or internal metadata endpoint:
  ```json
  {
    "token": "<Signed Goval Token>",
    "gurl": "wss://eval.repl.it/wsv2/...",
    "conmanURL": "https://conman.repl.it/...",
    "wsURL": "wss://...",
    "dotdevHostname": "..."
  }
  ```

---

## 3. Crosis WebSocket Channel Protocol (`@replit/protocol`)

### 3.1 Control Channel (Channel 0)
- Messages exchanged:
  - `Hello` / `Connect`: Handshake with client token and capabilities.
  - `ContainerState`: Notifies when container state transitions from `SLEEP` -> `READY`.
  - `BootStatus`: Reports container boot steps (filesystem mount, nix environment build, port forwards).
  - `Ping` / `Pong`: Heartbeat keepalive every 15-30 seconds.

### 3.2 Exec & Shell Channel (`service: "exec"` / `service: "shell"`)
- **Open Channel**: `api.OpenChannel` with service `"exec"` or `"shell"`.
- **Start Execution**:
  ```typescript
  channel.send({
    exec: {
      args: ["/bin/bash", "-l"],
      env: { TERM: "xterm-256color" }
    }
  });
  ```
- **Terminal Resize**:
  ```typescript
  channel.send({
    resizeTerm: {
      rows: process.stdout.rows || 24,
      cols: process.stdout.columns || 80
    }
  });
  ```
- **Terminal Input**:
  ```typescript
  channel.send({
    input: dataString
  });
  ```
- **Terminal Output Listener**:
  ```typescript
  channel.onCommand((cmd) => {
    if (cmd.output) process.stdout.write(cmd.output);
    if (cmd.stderr) process.stderr.write(cmd.stderr);
    if (cmd.exitCodeEvent) handleExit(cmd.exitCodeEvent.code);
  });
  ```

### 3.3 Files Channel (`service: "files"`)
- `readdir`: Returns directory listing (`api.Files`).
- `read`: Returns file buffer content (`api.File`).
- `write`: Writes content to path in container.
- `remove`: Removes file or directory.
- `stat`: Queries file size, permissions, modified timestamp.

---

## 4. SSH Endpoint Specification

- **Host**: `ssh.replit.com`
- **Port**: `22`
- **Username**: `repl` or `<replit-username>`
- **Authentication**: Public Key (configured in Replit user settings / Workspace Tools).
- **Target Repl**: Specified via SSH command alias or environment header.
