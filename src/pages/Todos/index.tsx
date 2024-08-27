import {
  Box,
  List,
  ListItem,
  Checkbox,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { useTodoDetails } from "./useTodoDetails";
import BackButton from "../../components/BackButton";
import TodoActions from "../../components/TodoActions";
import TodoCreation from "../../components/TodoCreation";
import Loading from "../../components/Loading";

export default function Todos() {
  const { todosListId } = useParams<{ todosListId: string }>();

  const {
    todos,
    loading,
    newTodoName,
    handleAddTodo,
    handleDeleteTodo,
    handleCreateTodoName,
    handleChangeTodoName,
    handleUpdateTodoName,
    handleUpdateTodoStatus,
  } = useTodoDetails(todosListId as string);

  if (loading) return <Loading />;

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <BackButton route="/todos" />
      </Box>

      <Typography variant="h6" align="center" gutterBottom>
        Tarefas
      </Typography>

      <TodoCreation
        newTodoName={newTodoName}
        onAddTodo={handleAddTodo}
        onNewTodoChange={handleCreateTodoName}
      />

      {todos.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" color="textSecondary">
            Não existem tarefas para essa lista.
          </Typography>
        </Box>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} sx={{ alignItems: "center", mb: 1 }}>
              <Checkbox
                checked={todo.status}
                color="primary"
                onChange={(event) =>
                  handleUpdateTodoStatus(todo.id, event.target.checked)
                }
              />

              <TextField
                value={todo.name}
                variant="standard"
                onChange={(event) =>
                  handleChangeTodoName(todo.id, event.target.value)
                }
                size="small"
                sx={{
                  mr: 2,
                  flex: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <TodoActions
                      type="todo"
                      onDelete={() => handleDeleteTodo(todo.id)}
                      onEdit={() => handleUpdateTodoName(todo.id, todo.name)}
                    />
                  ),
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
