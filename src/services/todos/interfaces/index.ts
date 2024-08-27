export interface Todo {
  id: string;
  name: string;
  status: boolean;
}

export interface TodoDTO {
  id: string;
  name: string;
  status: boolean;
}

export interface CreateTodoDTO {
  name: string;
}
