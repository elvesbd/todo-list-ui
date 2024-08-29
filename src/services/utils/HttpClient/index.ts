import axios, { AxiosRequestConfig } from "axios";
import { APIError } from "../../../errors/APIError";
import { HttpRequestOptions } from "./interfaces/HttpRequestOptions";
import { HttpClientInterface } from "./interfaces/HttpClientInterface";
import Cookies from "js-cookie";

export class HttpClient implements HttpClientInterface {
  private axiosInstance;

  constructor() {
    const baseURL = 'https://todo-list-api-8o29.onrender.com/api';
    this.axiosInstance = axios.create({ baseURL });
    this.configureRequestInterceptor();
  }

  private configureRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get("authToken");

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.makeRequest<T>(path, {
      method: "GET",
      headers: options?.headers,
      signal: options?.signal,
    });
  }

  async post<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.makeRequest<T>(path, {
      method: "POST",
      body: options?.body,
      headers: options?.headers,
    });
  }

  async put<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.makeRequest<T>(path, {
      method: "PUT",
      body: options?.body,
      headers: options?.headers,
    });
  }

  async delete<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.makeRequest<T>(path, {
      method: "DELETE",
      headers: options?.headers,
    });
  }

  private async makeRequest<T>(
    path: string,
    options: HttpRequestOptions & { method: string }
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url: path,
      data: options.body,
      signal: options.signal,
      method: options.method,
      headers: options.headers,
    };

    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error) && error.response) {
      throw new APIError(error.response);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
