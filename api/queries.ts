export const CURRENT_USER_QUERY = `
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
`;

export const USER_REPLS_QUERY = `
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
`;

export const REPL_BY_URL_QUERY = `
  query ReplByUrlInfo($url: String!) {
    replByUrlInfo(url: $url) {
      id
      title
      slug
      url
      language
      isPrivate
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_REPL_MUTATION = `
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
`;

export const DELETE_REPL_MUTATION = `
  mutation DeleteRepl($id: String!) {
    deleteRepl(id: $id) {
      id
    }
  }
`;

export const REPL_CONNECTION_METADATA_QUERY = `
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
`;
