import { Token } from "./interfaces";
import { HttpClient } from "../utils/HttpClient";

class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async login(email: string, password: string): Promise<Token> {
    const body = { email, password };
    return this.httpClient.post<Token>("/login", { body });
  }

  async logout(): Promise<void> {
    return this.httpClient.post("/logout");
  }
}

export default new AuthService();
