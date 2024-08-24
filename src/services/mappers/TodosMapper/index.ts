import { TodoDTO, Todo, CreateTodoDTO } from "../../todos";

export class TodosMapper {
  static toDomain(dto: TodoDTO): Todo {
    return {
      id: dto.id,
      name: dto.name,
      status: dto.status,
    };
  }

  static toPersistence(domain: CreateTodoDTO): CreateTodoDTO {
    return {
      name: domain.name,
    };
  }
}
