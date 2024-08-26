import {
  Box,
  List,
  ListItem,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { useTodoDetails } from "./useTodoDetails";
import BackButton from "../../components/BackButton";
import TodoActions from "../../components/TodoActions";
import TodoCreation from "../../components/TodoCreation";

export default function TodoDetails() {
  const { todosListId } = useParams<{ todosListId: string }>();
  const {
    todos,
    loading,
    newTodoName,
    handleEditTodo,
    handleDeleteTodo,
    handleAddTodoClick,
    handleChangeTodoName,
    handleUpdateTodoName,
    handleUpdateTodoStatus,
  } = useTodoDetails(todosListId as string);

  if (loading) return <p>Loading...</p>;

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
        onAddClick={handleAddTodoClick}
        onNewTaskChange={handleChangeTodoName}
      />

      <List>
        {todos.map((task) => (
          <ListItem key={task.id} sx={{ alignItems: "center", mb: 1 }}>
            <Checkbox
              checked={task.status}
              color="primary"
              onChange={() => handleUpdateTodoStatus(task.id)}
            />

            <TextField
              value={task.name}
              variant="standard"
              onChange={(event) => handleUpdateTodoName(task.id, event)}
              size="small"
              sx={{
                mr: 2,
                flex: 1,
              }}
              InputProps={{
                endAdornment: (
                  <TodoActions
                    type="todo"
                    onDelete={() => handleDeleteTodo(task.id)}
                    onEdit={() => handleEditTodo(task.id, task.name)}
                  />
                ),
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
