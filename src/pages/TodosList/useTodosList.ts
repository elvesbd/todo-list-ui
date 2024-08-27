import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { TodosList } from "./interfaces";
import useNotification from "../../hooks/notifications/useNotification";
import TodosListService from "../../services/todosList/TodosListService";

export function useTodosList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { notifySuccess, notifyError } = useNotification();
  const [todosList, setTodosList] = useState<TodosList[]>([]);
  const [shouldFetchTodosList, setShouldFetchTodosList] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedTodoList, setSelectedTodoList] = useState<TodosList | null>(
    null
  );

  useEffect(() => {
    const fetchTodosList = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await TodosListService.getAll();
        setTodosList(response);
        setLoading(false);
      } catch (err) {
        notifyError("Não foi possível carregar a lista de tarefas!");
      }
    };

    fetchTodosList();
  }, [notifyError, shouldFetchTodosList]);

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

  const handleCreateOrUpdate = useCallback(
    (name: string, color: string) => {
      if (selectedTodoList) {
        handleUpdateTodoList(name, color, selectedTodoList);
      } else {
        handleSaveTodoList(name, color);
      }

      setIsCreateModalVisible(false);
    },
    [selectedTodoList, setTodosList, setIsCreateModalVisible]
  );

  const handleSaveTodoList = async (name: string, color: string) => {
    try {
      await TodosListService.save({ name, color });

      setShouldFetchTodosList((prev) => !prev);

      setSelectedTodoList(null);
      notifySuccess("Lista criada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível criar a lista!");
    }
  };

  const handleUpdateTodoList = async (
    name: string,
    color: string,
    selectedTodoList: TodosList
  ) => {
    try {
      await TodosListService.update(selectedTodoList.id, { name, color });

      setShouldFetchTodosList((prev) => !prev);

      notifySuccess("Lista atualizada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível atualizar a lista!");
    }
  };

  const handleDeleteTodoList = useCallback(async (todoListId: number) => {
    try {
      await TodosListService.remove(todoListId);

      setShouldFetchTodosList((prev) => !prev);

      notifySuccess("Lista apagada com sucesso!");
    } catch (err) {
      notifyError("Não foi possível apagar a lista!");
    }
  }, []);

  const handleOpenCreateTodoListModal = useCallback(() => {
    setSelectedTodoList(null);
    setIsCreateModalVisible(true);
  }, []);

  const handleCloseCreateTodoListModal = () => {
    setSelectedTodoList(null);
    setIsCreateModalVisible(false);
  };

  return {
    loading,
    todosList,
    handleDeleteTodoList,
    handleViewTodos,
    selectedTodoList,
    handleOpenCreateTodoListModal,
    handleEditTodoList,
    handleCreateOrUpdate,
    isCreateModalVisible,
    handleCloseCreateTodoListModal,
  };
}
