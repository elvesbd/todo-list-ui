import { TodosListMapper } from "../mappers";
import { HttpClient } from "../utils/HttpClient";
import { TodosList, TodoListDTO, CreateTodoListDTO } from "./interfaces";

class TodosListService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAll(signal?: AbortSignal): Promise<TodosList[]> {
    const todosLists = await this.httpClient.get<TodosList[]>(`/todosList`, {
      signal,
    });
    return todosLists.map(TodosListMapper.toDomain);
  }

  async getById(todoListId: string, signal?: AbortSignal): Promise<TodosList> {
    const todosList = await this.httpClient.get<TodosList>(
      `/todosList/${todoListId}`,
      {
        signal,
      }
    );
    return TodosListMapper.toDomain(todosList);
  }

  async create(todoList: CreateTodoListDTO): Promise<TodosList> {
    const body = TodosListMapper.toPersistence(todoList);
    return this.httpClient.post("/todosList", { body });
  }

  async update(todoListId: number, todoList: TodoListDTO): Promise<void> {
    const body = TodosListMapper.toPersistence(todoList);
    return this.httpClient.put(`/todosList/${todoListId}`, { body });
  }

  async delete(todoListId: number): Promise<void> {
    return this.httpClient.delete(`/todosList/${todoListId}`);
  }
}

export default new TodosListService();
