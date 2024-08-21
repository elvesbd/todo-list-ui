import { HttpClient } from "../utils/HttpClient";
import { User } from "./interfaces";

class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  // Função para fazer login e obter um token
  async login(email: string, password: string): Promise<User> {
    const body = { email, password };
    return this.httpClient.post<User>("/api/login", { body });
  }

  // Função para fazer logout
  async logout(): Promise<void> {
    return this.httpClient.post("/api/logout");
  }
}

export default new AuthService();
