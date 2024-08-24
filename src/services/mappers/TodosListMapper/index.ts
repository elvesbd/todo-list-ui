import { TodosList, CreateTodoListDTO, TodoListDTO } from "../../todosList";

export class TodosListMapper {
  static toDomain(dto: TodosList): TodosList {
    return {
      id: dto.id,
      name: dto.name,
      color: dto.color,
    };
  }

  static toPersistence(domain: CreateTodoListDTO): TodoListDTO {
    return {
      name: domain.name,
      color: domain.color,
    };
  }
}
