import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Box, Typography, Paper, TextField } from "@mui/material";

import { TodosList } from "../../pages/TodosList/interfaces";

interface ModalProps {
  title: string;
  visible: boolean;
  confirmLabel: string;
  selectedTodoList: TodosList | null;
  onCancel: () => void;
  onConfirm: (name: string, color: string) => void;
}

export default function TodoListModal({
  title,
  visible,
  confirmLabel,
  selectedTodoList,
  onCancel,
  onConfirm,
}: ModalProps) {
  const [todoListName, setTodoListName] = useState("");
  const [todoListColor, setTodoListColor] = useState("#000");

  useEffect(() => {
    if (selectedTodoList) {
      setTodoListName(selectedTodoList.name);
      setTodoListColor(selectedTodoList.color);
    } else {
      setTodoListName("");
      setTodoListColor("#000");
    }
  }, [selectedTodoList]);

  const handleConfirm = () => {
    onConfirm(todoListName, todoListColor);
  };

  const handleCancel = () => {
    setTodoListName("");
    setTodoListColor("#000");
    onCancel();
  };

  if (!visible) return null;

  return ReactDOM.createPortal(
    <Box
      p={2}
      top={0}
      left={0}
      zIndex={1}
      display="flex"
      width="100%"
      height="100%"
      position="fixed"
      alignItems="center"
      justifyContent="center"
      sx={{
        backdropFilter: "blur(2px)",
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          background: "#fff",
          borderRadius: "4px",
          padding: "24px",
          margin: "12px",
          maxWidth: "450px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.04)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" paragraph>
          Informe os detalhes da lista
        </Typography>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Nome"
            value={todoListName}
            onChange={(e) => setTodoListName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            type="color"
            label="Cor"
            value={todoListColor}
            onChange={(e) => setTodoListColor(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              input: {
                cursor: "pointer",
                height: "56px",
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          mt={4}
        >
          <Button
            variant="contained"
            onClick={handleCancel}
            sx={{
              backgroundColor: "transparent",
              color: "#808080",
              marginRight: "8px",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Cancelar
          </Button>

          <Button variant="contained" color="primary" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </Box>
      </Paper>
    </Box>,
    document.getElementById("modal-root")!
  );
}
