import { List, ListDTO } from "../../todo/todoList/interfaces";

export class ToDoListMapper {
  static toDomain(dto: ListDTO): List {
    return {
      id: dto.id,
      name: dto.name,
      color: dto.color,
    };
  }

  static toPersistence(domain: List): ListDTO {
    return {
      id: domain.id,
      name: domain.name,
      color: domain.color,
    };
  }
}
