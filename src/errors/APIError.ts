import { AxiosResponse } from "axios";

export class APIError extends Error {
  response: AxiosResponse;
  body: any;

  constructor(response: AxiosResponse) {
    super();
    this.name = "APIError";
    this.response = response;
    this.body = response.data;
    this.message =
      this.body?.error || `${response.status} - ${response.statusText}`;
  }
}
