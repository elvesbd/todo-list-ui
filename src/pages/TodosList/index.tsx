import { List, Box, Avatar, ListItem, TextField } from "@mui/material";

import { useTodosList } from "./useTodosList";
import Header from "../../components/Header";
import TodoActions from "../../components/TodoActions";
import TodosListModal from "../../components/TodosListModal";
import Loading from "../../components/Loading";

export default function TodosList() {
  const {
    loading,
    todosList,
    handleViewTodos,
    selectedTodoList,
    handleEditTodoList,
    handleDeleteTodoList,
    handleCreateOrUpdate,
    isCreateModalVisible,
    handleOpenCreateTodoListModal,
    handleCloseCreateTodoListModal,
  } = useTodosList();

  if (loading) return <Loading />;

  return (
    <>
      <TodosListModal
        onConfirm={handleCreateOrUpdate}
        visible={isCreateModalVisible}
        onCancel={handleCloseCreateTodoListModal}
        selectedTodoList={selectedTodoList}
        title={selectedTodoList ? "Editar Lista" : "Criar Lista"}
        confirmLabel={selectedTodoList ? "Salvar Alterações" : "Criar Lista"}
      />

      <Box maxWidth={600} margin="0 auto" mt={11}>
        <Header
          title="Lista de Tarefas"
          buttonText="Criar lista"
          onButtonClick={handleOpenCreateTodoListModal}
        />

        <List>
          {todosList.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{ alignItems: "center", mb: 1, cursor: "pointer" }}
              onClick={() => handleViewTodos(todo.id)}
            >
              <Avatar sx={{ bgcolor: todo.color, marginRight: 2 }}>
                {todo?.name?.charAt(0)}
              </Avatar>

              <TextField
                value={todo.name}
                variant="standard"
                size="small"
                fullWidth
                sx={{
                  mr: 2,
                  flex: 1,
                  cursor: "pointer",
                  "& .MuiInputBase-input": {
                    cursor: "pointer",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: todo.color,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Box
                      display="flex"
                      gap={1}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <TodoActions
                        type="todoList"
                        onEdit={() => handleEditTodoList(todo.id)}
                        onDelete={() => handleDeleteTodoList(todo.id)}
                      />
                    </Box>
                  ),
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
