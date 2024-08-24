import { List, Box, Avatar, ListItem, TextField } from "@mui/material";

import { useTodos } from "./useTodos";
import Header from "../../components/Header";
import TodoActions from "../../components/TodoActions";
import TodoListModal from "../../components/TodoListModal";

export default function TodosList() {
  const {
    todosList,
    handleDelete,
    handleViewTodos,
    selectedTodoList,
    handleCreateList,
    handleEditTodoList,
    handleSaveTodoList,
    isCreateModalVisible,
    handleCloseCreateModal,
  } = useTodos();

  return (
    <>
      <TodoListModal
        onConfirm={handleSaveTodoList}
        visible={isCreateModalVisible}
        onCancel={handleCloseCreateModal}
        selectedTodoList={selectedTodoList}
        title={selectedTodoList ? "Editar Lista" : "Criar Lista"}
        confirmLabel={selectedTodoList ? "Salvar Alterações" : "Criar Lista"}
      />

      <Box maxWidth={600} margin="0 auto" mt={11}>
        <Header
          title="Lista de Tarefas"
          buttonText="Criar lista"
          onButtonClick={handleCreateList}
        />

        <List>
          {todosList.map((todo) => (
            <ListItem
              key={todo.id}
              sx={{ alignItems: "center", mb: 1, cursor: "pointer" }}
              onClick={() => handleViewTodos(todo.id)}
            >
              <Avatar sx={{ bgcolor: todo.color, marginRight: 2 }}>
                {todo.name.charAt(0)}
              </Avatar>

              <TextField
                value={todo.name}
                variant="standard"
                onChange={(event) => console.log(event)}
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
                        onDelete={() => handleDelete(todo.id)}
                        onEdit={() => handleEditTodoList(todo.id)}
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
