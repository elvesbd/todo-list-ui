export interface Todo {
  id: number;
  name: string;
  status: "done" | "not done";
}

export interface TodoDTO {
  id: number;
  name: string;
  status: "done" | "not done";
}

export interface CreateTodoDTO {
  name: string;
}
