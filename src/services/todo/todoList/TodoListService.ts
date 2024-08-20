import { ToDoListMapper } from "../../mappers/ToDoListMapper";
import { HttpClient } from "../../utils/HttpClient";
import { List, ListDTO } from "./interfaces";

class TodoListService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  // Lista todas as listas, ordenadas por nome ou cor
  async listLists(
    orderBy: "name" | "color" = "name",
    signal?: AbortSignal
  ): Promise<List[]> {
    const lists = await this.httpClient.get<ListDTO[]>(
      `/lists?orderBy=${orderBy}`,
      { signal }
    );
    return lists.map(ToDoListMapper.toDomain);
  }

  // Obtém uma lista pelo ID
  async getListById(id: string, signal?: AbortSignal): Promise<List> {
    const list = await this.httpClient.get<ListDTO>(`/lists/${id}`, { signal });
    return ToDoListMapper.toDomain(list);
  }

  // Cria uma nova lista
  async createList(list: List): Promise<void> {
    const body = ToDoListMapper.toPersistence(list);
    return this.httpClient.post("/lists", { body });
  }

  // Atualiza uma lista existente
  async updateList(id: string, list: List): Promise<void> {
    const body = ToDoListMapper.toPersistence(list);
    return this.httpClient.put(`/lists/${id}`, { body });
  }

  // Deleta uma lista
  async deleteList(id: string): Promise<void> {
    return this.httpClient.delete(`/lists/${id}`);
  }
}

export default new TodoListService();
