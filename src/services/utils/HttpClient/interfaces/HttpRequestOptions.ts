export interface HttpRequestOptions {
  body?: any;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}
