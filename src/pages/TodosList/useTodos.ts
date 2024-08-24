import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { TodosList } from "./interfaces";
import useNotification from "../../hooks/notifications/useNotification";
import TodosListService from "../../services/todo/todosList/TodosListService";

const mockTodos: TodosList[] = [
  {
    id: 1,
    name: "Correr",
    color: "#ff0000",
  },
  {
    id: 2,
    name: "Lavar Carro",
    color: "#0000ff",
  },
  {
    id: 3,
    name: "Fazer compras",
    color: "#008000",
  },
  {
    id: 4,
    name: "Pagar Gás",
    color: "#ffff00",
  },
];

export function useTodos() {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();
  const [todosList, setTodosList] = useState<TodosList[]>(mockTodos);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedTodoList, setSelectedTodoList] = useState<TodosList | null>(
    null
  );

  /* useEffect(() => {
    const fetchTodosList = async () => {
      try {
        const response = await TodosListService.getAll();
        setTodosList(response);
      } catch (err) {
        notifyError("Não foi possível carregar a lista de tarefas!");
      }
    };

    fetchTodosList();
  }, [notifyError]); */

  const handleViewTodos = useCallback(
    (id: number) => {
      navigate(`/todos/${id}`);
    },
    [navigate]
  );

  const handleEditTodoList = useCallback(
    (todoListId: number) => {
      const todoToEdit = todosList.find(
        (todoList) => todoList.id === todoListId
      );
      if (todoToEdit) {
        setSelectedTodoList(todoToEdit);
        setIsCreateModalVisible(true);
      }
    },
    [todosList]
  );

  const handleCreateList = useCallback(() => {
    setSelectedTodoList(null);
    setIsCreateModalVisible(true);
  }, []);

  const handleSaveTodoList = useCallback(
    (name: string, color: string) => {
      console.log(selectedTodoList);
      console.log(name, color);

      if (selectedTodoList) {
        updateTodoList(name, color, selectedTodoList);
      } else {
        createTodoList(name, color);
      }

      setIsCreateModalVisible(false);
    },
    [selectedTodoList, setTodosList, setIsCreateModalVisible]
  );

  const createTodoList = async (name: string, color: string) => {
    try {
      const newTodo = await TodosListService.create({ name, color });

      setTodosList((prevTodosList: TodosList[]) => [...prevTodosList, newTodo]);

      setSelectedTodoList(null);
      notifySuccess("Lista criada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível criar a lista!");
    }
  };

  const updateTodoList = async (
    name: string,
    color: string,
    todosList: TodosList
  ) => {
    try {
      const updatedTodoList = { ...todosList, name, color };
      await TodosListService.update(todosList.id, updatedTodoList);

      setTodosList((prevTodosList: TodosList[]) =>
        prevTodosList.map((todo: TodosList) =>
          todo.id === todosList.id ? updatedTodoList : todosList
        )
      );

      notifySuccess("Lista atualizada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível atualizar a lista!");
    }
  };

  const handleDelete = useCallback(async (todoListId: number) => {
    try {
      await TodosListService.delete(todoListId);

      setTodosList((prevTodosList) =>
        prevTodosList.filter((todoList) => todoList.id !== todoListId)
      );

      notifySuccess("Lista apagada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível apagar a lista!");
    }
  }, []);

  const handleCloseCreateModal = () => {
    setSelectedTodoList(null);
    setIsCreateModalVisible(false);
  };

  return {
    todosList,
    handleDelete,
    handleViewTodos,
    selectedTodoList,
    handleCreateList,
    handleEditTodoList,
    handleSaveTodoList,
    isCreateModalVisible,
    handleCloseCreateModal,
  };
}
