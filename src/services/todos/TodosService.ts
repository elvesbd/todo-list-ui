import { TodosMapper } from "../mappers";
import { HttpClient } from "../utils/HttpClient";
import { CreateTodoDTO, Todo } from "./interfaces";

class TodosService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAll(todosListId: string, signal?: AbortSignal): Promise<Todo[]> {
    const todos = await this.httpClient.get<Todo[]>(
      `/todos/todosListId/${todosListId}`,
      {
        signal,
      }
    );
    return todos.map(TodosMapper.toDomain);
  }

  /* async getById(todoId: number, signal?: AbortSignal): Promise<Todo> {
    const todoList = await this.httpClient.get<Todo>(`/todos/${todoId}`, {
      signal,
    });
    return TodosMapper.toDomain(todoList);
  } */

  async save(todosLisId: string, todo: CreateTodoDTO): Promise<void> {
    const body = {
      ...TodosMapper.toPersistence(todo),
      todosLisId,
    };
    return this.httpClient.post(`/todos`, { body });
  }

  async updateName(todoId: number, newName: string): Promise<void> {
    const body = { name: newName };
    return this.httpClient.put(`/todos/${todoId}/update-name`, { body });
  }

  async updateStatus(todoId: number, newStatus: boolean): Promise<void> {
    const body = { status: newStatus };
    return this.httpClient.put(`/todos/${todoId}/update-status`, { body });
  }

  async remove(todoId: number): Promise<void> {
    return this.httpClient.delete(`/todos/${todoId}`);
  }
}

export default new TodosService();
