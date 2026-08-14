# Replit GraphQL Schema & Persisted Query Map

## 1. Gateway Security & APQ Protocol

Replit's GraphQL API gateway at `https://replit.com/graphql` uses Apollo Server Automated Persisted Queries (APQ).

### Wire Request Format
```json
{
  "operationName": "CurrentUser",
  "variables": {},
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": "<pre-registered-sha256-hash>"
    }
  }
}
```

---

## 2. Core Operational Schemas

### 2.1 `CurrentUser`
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

### 2.2 `UserRepls`
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
        language
        isPrivate
        timeCreated
        timeUpdated
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

### 2.3 `CreateRepl`
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

### 2.4 `ReplConnectionMetadata`
```graphql
query ReplConnectionMetadata($id: String!) {
  repl(id: $id) {
    id
    connectionMetadata {
      token
      gurl
      conmanURL
      wsURL
      dotdevHostname
    }
  }
}
```
