import { Box, TextField, Button } from "@mui/material";

interface TodoCreationProps {
  readonly newTodoName: string;
  readonly onAddTodo: () => void;
  readonly onNewTodoChange: (todoName: string) => void;
}

export default function TodoCreation({
  newTodoName,
  onAddTodo,
  onNewTodoChange,
}: TodoCreationProps) {
  return (
    <Box sx={{ mb: 2, display: "flex", gap: 1, padding: "24px" }}>
      <TextField
        value={newTodoName}
        onChange={(event) => onNewTodoChange(event.target.value)}
        variant="outlined"
        label="Nova Tarefa"
        size="small"
        sx={{ flex: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onAddTodo}
        sx={{ height: "100%" }}
      >
        Adicionar
      </Button>
    </Box>
  );
}
