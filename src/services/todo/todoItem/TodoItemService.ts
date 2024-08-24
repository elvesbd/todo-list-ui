import { ToDoItemMapper } from "../../mappers/ToDoItemMapper";
import { HttpClient } from "../../utils/HttpClient";
import { Item, ItemDTO } from "./interfaces";

class TodoItemService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  // Lista todos os itens de uma lista específica, ordenados por nome ou estado
  async listItems(
    listId: number,
    orderBy: "name" | "status" = "name",
    signal?: AbortSignal
  ): Promise<Item[]> {
    const items = await this.httpClient.get<ItemDTO[]>(
      `/lists/${listId}/items?orderBy=${orderBy}`,
      { signal }
    );
    return items.map(ToDoItemMapper.toDomain);
  }

  // Obtém um item pelo ID
  async getItemById(
    listId: string,
    itemId: string,
    signal?: AbortSignal
  ): Promise<Item> {
    const item = await this.httpClient.get<ItemDTO>(
      `/lists/${listId}/items/${itemId}`,
      { signal }
    );
    return ToDoItemMapper.toDomain(item);
  }

  async createItem(listId: string, item: Item): Promise<void> {
    const body = ToDoItemMapper.toPersistence(item);
    return this.httpClient.post(`/lists/${listId}/items`, { body });
  }

  async updateItemName(itemId: number, newName: string): Promise<void> {
    const body = { name: newName };
    return this.httpClient.put(`/items/${itemId}`, { body });
  }

  async updateItemStatus(itemId: number, newStatus: string): Promise<void> {
    const body = { status: newStatus };
    return this.httpClient.put(`/items/${itemId}`, { body });
  }

  async deleteItem(itemId: number): Promise<void> {
    return this.httpClient.delete(`/items/${itemId}`);
  }
}

export default new TodoItemService();
