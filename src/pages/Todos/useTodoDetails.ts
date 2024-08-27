import { useState, useEffect } from "react";

import { Todo } from "./interfaces";
import TodosService from "../../services/todos/TodosService";
import useNotification from "../../hooks/notifications/useNotification";

export function useTodoDetails(todosListId: string) {
  const { notifySuccess, notifyError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [shouldFetchTodos, setShouldFetchTodos] = useState(false);

  useEffect(() => {
    const fetchTodosList = async () => {
      try {
        const response = await TodosService.getAll(todosListId);
        setTodos(response);
        setLoading(false);
      } catch (err) {
        notifyError("Não foi possível carregar as tarefas da lista!");
      }
    };

    fetchTodosList();
  }, [notifyError, shouldFetchTodos]);

  const handleUpdateTodoStatus = async (todoId: string, status: boolean) => {
    try {
      await TodosService.updateStatus(todoId, status);

      setShouldFetchTodos((prev) => !prev);

      notifySuccess("Status da tarefa atualizado com sucesso!");
    } catch (err) {
      notifyError("Não foi possível atualizar o status da tarefa!");
    }
  };

  const handleUpdateTodoName = async (todoId: string, newName: string) => {
    try {
      await TodosService.updateName(todoId, newName);

      setShouldFetchTodos((prev) => !prev);

      notifySuccess("Tarefa atualizada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível atualizar a tarefa!");
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await TodosService.remove(todoId);

      setShouldFetchTodos((prev) => !prev);

      notifySuccess("Tarefa removida com sucesso!");
    } catch (err) {
      notifyError("Não foi possível apagar a tarefa!");
    }
  };

  const handleSaveTodo = async (newTodoName: string) => {
    try {
      await TodosService.save(todosListId, { name: newTodoName });

      setShouldFetchTodos((prev) => !prev);

      notifySuccess("Tarefa adicionada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível adicionar a tarefa!");
    }
  };

  const handleCreateTodoName = (todoName: string) => {
    setNewTodoName(todoName);
  };

  const handleChangeTodoName = (todoId: string, newName: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, name: newName } : todo
      )
    );
  };

  const handleAddTodo = () => {
    if (newTodoName.trim()) {
      handleSaveTodo(newTodoName);
      setNewTodoName("");
    }
  };

  return {
    loading,
    newTodoName,
    handleAddTodo,
    handleSaveTodo,
    handleDeleteTodo,
    handleUpdateTodoName,
    handleChangeTodoName,
    handleCreateTodoName,
    handleUpdateTodoStatus,
    todos: todos || [],
  };
}
