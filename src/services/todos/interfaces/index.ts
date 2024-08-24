export interface Todo {
  id: number;
  name: string;
  status: boolean;
}

export interface TodoDTO {
  id: number;
  name: string;
  status: boolean;
}

export interface CreateTodoDTO {
  name: string;
}
