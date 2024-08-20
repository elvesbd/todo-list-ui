import { Item, ItemDTO } from "../../todo/todoItem/interfaces";

export class ToDoItemMapper {
  static toDomain(dto: ItemDTO): Item {
    return {
      id: dto.id,
      name: dto.name,
      status: dto.status, // 'done' or 'not done'
    };
  }

  static toPersistence(domain: Item): ItemDTO {
    return {
      id: domain.id,
      name: domain.name,
      status: domain.status, // 'done' or 'not done'
    };
  }
}
