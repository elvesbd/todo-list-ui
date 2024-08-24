import { HttpClient } from "../../utils/HttpClient";
import { TodosList, TodoListDTO } from "./interfaces";
import { ToDoListMapper } from "../../mappers/ToDoListMapper";

class TodosListService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAll(
    orderBy: "name" | "color" = "name",
    signal?: AbortSignal
  ): Promise<TodosList[]> {
    const todosLists = await this.httpClient.get<TodosList[]>(
      `/todosList?orderBy=${orderBy}`,
      { signal }
    );
    return todosLists.map(ToDoListMapper.toDomain);
  }

  async getById(id: string, signal?: AbortSignal): Promise<TodosList> {
    const todosList = await this.httpClient.get<TodosList>(`/todosList/${id}`, {
      signal,
    });
    return ToDoListMapper.toDomain(todosList);
  }

  async create(todoListDTO: TodoListDTO): Promise<TodosList> {
    const body = ToDoListMapper.toPersistence(todoListDTO);
    return this.httpClient.post("/todosList", { body });
  }

  async update(id: number, todoList: TodoListDTO): Promise<void> {
    const body = ToDoListMapper.toPersistence(todoList);
    return this.httpClient.put(`/todosList/${id}`, { body });
  }

  async delete(id: number): Promise<void> {
    return this.httpClient.delete(`/todosList/${id}`);
  }
}

export default new TodosListService();
