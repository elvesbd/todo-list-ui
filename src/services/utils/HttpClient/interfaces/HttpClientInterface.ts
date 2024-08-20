import { HttpRequestOptions } from "./HttpRequestOptions";

export interface HttpClientInterface {
  get<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  post<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  put<T>(path: string, options?: HttpRequestOptions): Promise<T>;
  delete<T>(path: string, options?: HttpRequestOptions): Promise<T>;
}
