import { TodosList, TodoListDTO } from "../../todo/todosList/interfaces";

export class ToDoListMapper {
  static toDomain(dto: TodosList): TodosList {
    return {
      id: dto.id,
      name: dto.name,
      color: dto.color,
    };
  }

  static toPersistence(domain: TodoListDTO): TodoListDTO {
    return {
      name: domain.name,
      color: domain.color,
    };
  }
}
