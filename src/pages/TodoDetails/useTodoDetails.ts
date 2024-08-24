import { useCallback, useState, useEffect, ChangeEvent } from "react";

import { Todo } from "./interfaces";
import useNotification from "../../hooks/notifications/useNotification";
import TodosService from "../../services/todos/TodosService";

const todos: Todo[] = [
  { id: 1, name: "Lista 1", status: true },
  { id: 2, name: "Lista 2", status: false },
];

export function useTodoDetails(id: number) {
  const { notifySuccess, notifyError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState("");
  const [todoDetails, setTodoDetails] = useState<Todo[] | []>(todos);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await TodosService.getAll();
      setTodoDetails(response);
    } catch (err) {
      notifyError("Não foi possível carregar as tarefas da lista!");
    } finally {
      setLoading(false);
    }
  }, [id, notifyError]);

  const handleStatusChange = useCallback(
    async (taskId: number) => {
      const updatedDetails: Todo[] = todoDetails.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      );
      setTodoDetails(updatedDetails);

      try {
        const updatedTask = updatedDetails.find((task) => task.id === taskId);
        if (updatedTask) {
          //await TodoItemService.updateItemStatus(taskId, updatedTask.status);
          notifySuccess("Status da tarefa atualizado com sucesso!");
        }
      } catch (err) {
        notifyError("Não foi possível atualizar o status da tarefa!");
        fetchTodos();
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodos]
  );

  const handleChangeName = useCallback(
    (
      taskId: number,
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newName = event.target.value;
      setTodoDetails((prevDetails) =>
        prevDetails.map((task) =>
          task.id === taskId ? { ...task, name: newName } : task
        )
      );
    },
    []
  );

  const handleEdit = useCallback(
    async (todoId: number, newName: string) => {
      console.log(todoId, newName);

      const updatedDetails = todoDetails.map((todo) =>
        todo.id === todoId ? { ...todo, name: newName } : todo
      );
      setTodoDetails(updatedDetails);

      try {
        //await TodoItemService.updateItemName(todoId, newName);
        notifySuccess("Tarefa atualizada com sucesso!");
      } catch (err) {
        notifyError("Não foi possível atualizar a tarefa!");
        fetchTodos();
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodos]
  );

  const handleDelete = useCallback(
    async (todoId: number) => {
      console.log({ todoId });

      setTodoDetails((prevDetails) =>
        prevDetails.filter((task) => task.id !== todoId)
      );

      try {
        //await TodoItemService.deleteItem(todoId);
        notifySuccess("Tarefa removida com sucesso!");
      } catch (err) {
        notifyError("Não foi possível apagar a tarefa!");
        fetchTodos();
      }
    },
    [id, notifySuccess, notifyError, fetchTodos]
  );

  const handleAddTask = useCallback(
    async (newTaskName: string) => {
      // Cria um novo ID para a nova tarefa
      const newTask: Todo = {
        id: Math.max(...todoDetails.map((task) => task.id)) + 1,
        name: newTaskName,
        status: false,
      };

      setTodoDetails((prevDetails) => [...prevDetails, newTask]);

      try {
        // await TodoItemService.createItem(newTask);
        notifySuccess("Tarefa adicionada com sucesso!");
      } catch (err) {
        notifyError("Não foi possível adicionar a tarefa!");
        fetchTodos();
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodos]
  );

  const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const handleAddClick = () => {
    if (newTaskName.trim()) {
      handleAddTask(newTaskName);
      setNewTaskName("");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    loading,
    handleEdit,
    newTaskName,
    handleDelete,
    handleAddTask,
    handleAddClick,
    handleChangeName,
    handleStatusChange,
    handleNewTaskChange,
    todoDetails: todoDetails || [],
  };
}
