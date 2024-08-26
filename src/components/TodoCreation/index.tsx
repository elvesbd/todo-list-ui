import React from "react";
import { Box, TextField, Button } from "@mui/material";

interface TodoCreationProps {
  readonly newTodoName: string;
  readonly onNewTaskChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  readonly onAddClick: () => void;
}

export default function TodoCreation({
  newTodoName,
  onAddClick,
  onNewTaskChange,
}: TodoCreationProps) {
  return (
    <Box sx={{ mb: 2, display: "flex", gap: 1, padding: "24px" }}>
      <TextField
        value={newTodoName}
        onChange={onNewTaskChange}
        variant="outlined"
        label="Nova Tarefa"
        size="small"
        sx={{ flex: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onAddClick}
        sx={{ height: "100%" }}
      >
        Adicionar
      </Button>
    </Box>
  );
}
