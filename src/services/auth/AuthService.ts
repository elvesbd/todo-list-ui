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
    const user = await this.httpClient.post<User>("/api/login", { body });
    return user;
  }

  // Função para fazer logout
  async logout(): Promise<void> {
    await this.httpClient.post("/api/logout");
  }
}

export default new AuthService();
