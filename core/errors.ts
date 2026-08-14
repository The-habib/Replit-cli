export enum ErrorCode {
  AUTH_EXPIRED = 'ERR_AUTH_EXPIRED',
  AUTH_REQUIRED = 'ERR_AUTH_REQUIRED',
  CONTAINER_TIMEOUT = 'ERR_CONTAINER_TIMEOUT',
  CONTAINER_UNREACHABLE = 'ERR_CONTAINER_UNREACHABLE',
  NETWORK_OFFLINE = 'ERR_NETWORK_OFFLINE',
  GRAPHQL_ERROR = 'ERR_GRAPHQL_ERROR',
  APQ_REQUIRED = 'ERR_APQ_REQUIRED',
  DB_DISCONNECTED = 'ERR_DB_DISCONNECTED',
  PROJECT_NOT_FOUND = 'ERR_PROJECT_NOT_FOUND',
  COMMAND_FAILED = 'ERR_COMMAND_FAILED',
}

export class RshError extends Error {
  public code: ErrorCode;
  public details?: any;

  constructor(code: ErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'RshError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, RshError.prototype);
  }
}
