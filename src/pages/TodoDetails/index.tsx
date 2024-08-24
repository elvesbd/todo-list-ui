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
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    handleEdit,
    newTaskName,
    todoDetails,
    handleDelete,
    handleAddClick,
    handleChangeName,
    handleStatusChange,
    handleNewTaskChange,
  } = useTodoDetails(Number(id));

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
        newTaskName={newTaskName}
        onAddClick={handleAddClick}
        onNewTaskChange={handleNewTaskChange}
      />

      <List>
        {todoDetails.map((task) => (
          <ListItem key={task.id} sx={{ alignItems: "center", mb: 1 }}>
            <Checkbox
              checked={task.status === "done"}
              color="primary"
              onChange={() => handleStatusChange(task.id)}
            />

            <TextField
              value={task.name}
              variant="standard"
              onChange={(event) => handleChangeName(task.id, event)}
              size="small"
              sx={{
                mr: 2,
                flex: 1,
              }}
              InputProps={{
                endAdornment: (
                  <TodoActions
                    type="todo"
                    onDelete={() => handleDelete(task.id)}
                    onEdit={() => handleEdit(task.id, task.name)}
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
