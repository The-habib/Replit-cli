export interface ReplOwner {
  id: string;
  username: string;
  image?: string;
}

export interface ReplInfo {
  id: string;
  title: string;
  slug: string;
  url: string;
  language: string;
  isPrivate: boolean;
  timeCreated?: string;
  timeUpdated?: string;
  description?: string;
  user?: ReplOwner;
}

export interface CreateReplInput {
  title: string;
  language?: string;
  isPrivate?: boolean;
  description?: string;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export interface CurrentUserData {
  currentUser?: {
    id: string;
    username: string;
    email?: string;
    name?: string;
    bio?: string;
    image?: string;
    isSubscribed?: boolean;
    plan?: {
      id: string;
      name: string;
    };
  };
}

export interface UserReplsData {
  userByUsername?: {
    id: string;
    username: string;
    repls?: {
      items: Array<{
        id: string;
        title: string;
        slug: string;
        url: string;
        language: string;
        isPrivate: boolean;
        timeCreated?: string;
        timeUpdated?: string;
        description?: string;
      }>;
      pageInfo?: {
        hasNextPage: boolean;
        nextCursor?: string;
      };
    };
  };
}

export interface ReplByUrlData {
  replByUrlInfo?: {
    id: string;
    title: string;
    slug: string;
    url: string;
    language: string;
    isPrivate: boolean;
    user?: {
      id: string;
      username: string;
    };
  };
}

export interface CreateReplData {
  createRepl?: {
    id?: string;
    title?: string;
    slug?: string;
    url?: string;
    language?: string;
    isPrivate?: boolean;
    message?: string;
  };
}

export interface DeleteReplData {
  deleteRepl?: {
    id?: string;
  };
}

export interface GovalConnectionMetadata {
  token: string;
  gurl: string;
  conmanURL?: string;
  wsURL?: string;
  dotdevHostname?: string;
}
