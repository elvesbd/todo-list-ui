import { useCallback, useState, useEffect, ChangeEvent } from "react";
import useNotification from "../../hooks/notifications/useNotification";
import TodoItemService from "../../services/todo/todoItem/TodoItemService";
import { Item } from "../../services/todo/todoItem/interfaces";

const todos: Item[] = [
  { id: 1, name: "Lista 1", status: "done" },
  { id: 2, name: "Lista 2", status: "not done" },
];

export function useTodoDetails(id: number) {
  const { notifySuccess, notifyError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [newTaskName, setNewTaskName] = useState("");
  const [todoDetails, setTodoDetails] = useState<Item[] | []>(todos);

  const fetchTodoDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await TodoItemService.listItems(id);
      setTodoDetails(response);
    } catch (err) {
      notifyError("Não foi possível carregar os detalhes da lista!");
    } finally {
      setLoading(false);
    }
  }, [id, notifyError]);

  const handleStatusChange = useCallback(
    async (taskId: number) => {
      // Atualiza o estado localmente
      const updatedDetails: Item[] = todoDetails.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "not done" : "done" }
          : task
      );
      setTodoDetails(updatedDetails);

      try {
        // Obtém o status atualizado da tarefa
        const updatedTask = updatedDetails.find((task) => task.id === taskId);
        if (updatedTask) {
          //await TodoItemService.updateItemStatus(taskId, updatedTask.status);
          notifySuccess("Status da tarefa atualizado com sucesso!");
        }
      } catch (err) {
        notifyError("Não foi possível atualizar o status da tarefa!");
        fetchTodoDetails(); // Recarrega a lista no caso de erro
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodoDetails]
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
        fetchTodoDetails(); // Recarrega a lista no caso de erro
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodoDetails]
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
        fetchTodoDetails(); // Recarrega a lista no caso de erro
      }
    },
    [id, notifySuccess, notifyError, fetchTodoDetails]
  );

  const handleAddTask = useCallback(
    async (newTaskName: string) => {
      // Cria um novo ID para a nova tarefa
      const newTask: Item = {
        id: Math.max(...todoDetails.map((task) => task.id)) + 1, // Simples incremento de ID
        name: newTaskName,
        status: "not done",
      };

      setTodoDetails((prevDetails) => [...prevDetails, newTask]);

      try {
        // await TodoItemService.createItem(newTask);
        notifySuccess("Nova tarefa adicionada com sucesso!");
      } catch (err) {
        notifyError("Não foi possível adicionar a nova tarefa!");
        fetchTodoDetails();
      }
    },
    [todoDetails, notifySuccess, notifyError, fetchTodoDetails]
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
    fetchTodoDetails();
  }, [fetchTodoDetails]);

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
