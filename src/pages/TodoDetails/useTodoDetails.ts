import { useCallback, useState, useEffect, ChangeEvent } from "react";

import { Todo } from "./interfaces";
import useNotification from "../../hooks/notifications/useNotification";
import TodosService from "../../services/todos/TodosService";

/* const todos: Todo[] = [
  { id: 1, name: "Lista 1", status: true },
  { id: 2, name: "Lista 2", status: false },
]; */

export function useTodoDetails(todosListId: string) {
  const { notifySuccess, notifyError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await TodosService.getAll(todosListId);
      setTodos(response);
    } catch (err) {
      notifyError("Não foi possível carregar as tarefas da lista!");
    } finally {
      setLoading(false);
    }
  }, [todosListId, notifyError]);

  const handleUpdateTodoStatus = useCallback(
    async (taskId: number) => {
      const updatedDetails: Todo[] = todos.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      );
      setTodos(updatedDetails);

      try {
        const updatedTask = updatedDetails.find((task) => task.id === taskId);
        if (updatedTask) {
          await TodosService.updateStatus(taskId, updatedTask.status);
          notifySuccess("Status da tarefa atualizado com sucesso!");
        }
      } catch (err) {
        notifyError("Não foi possível atualizar o status da tarefa!");
        fetchTodos();
      }
    },
    [todos, notifySuccess, notifyError, fetchTodos]
  );

  const handleUpdateTodoName = useCallback(
    (
      taskId: number,
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newName = event.target.value;
      setTodos((prevDetails) =>
        prevDetails.map((task) =>
          task.id === taskId ? { ...task, name: newName } : task
        )
      );
    },
    []
  );

  const handleEditTodo = useCallback(
    async (todoId: number, newName: string) => {
      console.log(todoId, newName);

      const updatedDetails = todos.map((todo) =>
        todo.id === todoId ? { ...todo, name: newName } : todo
      );
      setTodos(updatedDetails);

      try {
        await TodosService.updateName(todoId, newName);
        notifySuccess("Tarefa atualizada com sucesso!");
      } catch (err) {
        notifyError("Não foi possível atualizar a tarefa!");
        fetchTodos();
      }
    },
    [todos, notifySuccess, notifyError, fetchTodos]
  );

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      console.log({ todoId });

      setTodos((prevDetails) =>
        prevDetails.filter((task) => task.id !== todoId)
      );

      try {
        await TodosService.remove(todoId);
        notifySuccess("Tarefa removida com sucesso!");
      } catch (err) {
        notifyError("Não foi possível apagar a tarefa!");
        fetchTodos();
      }
    },
    [todosListId, notifySuccess, notifyError, fetchTodos]
  );

  const handleSaveTodo = useCallback(
    async (newTodoName: string) => {
      const newTask: Todo = {
        id: Math.max(...todos.map((task) => task.id)) + 1,
        name: newTodoName,
        status: false,
      };

      setTodos((prevDetails) => [...prevDetails, newTask]);

      try {
        await TodosService.save(todosListId, newTask);
        notifySuccess("Tarefa adicionada com sucesso!");
      } catch (err) {
        notifyError("Não foi possível adicionar a tarefa!");
        fetchTodos();
      }
    },
    [todos, notifySuccess, notifyError, fetchTodos]
  );

  const handleChangeTodoName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(event.target.value);
  };

  const handleAddTodoClick = () => {
    if (newTodoName.trim()) {
      handleSaveTodo(newTodoName);
      setNewTodoName("");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    loading,
    handleEditTodo,
    newTodoName,
    handleDeleteTodo,
    handleSaveTodo,
    handleAddTodoClick,
    handleUpdateTodoName,
    handleUpdateTodoStatus,
    handleChangeTodoName,
    todos: todos || [],
  };
}
