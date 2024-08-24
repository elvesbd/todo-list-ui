import { IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

type TodoType = "todoList" | "todo";

interface TodoActionsProps {
  readonly type: TodoType;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
}

export default function TodoActions({
  type,
  onEdit,
  onDelete,
}: TodoActionsProps) {
  return (
    <>
      <Tooltip title="Salvar" arrow>
        <IconButton
          edge="end"
          aria-label="salvar"
          onClick={onEdit}
          sx={{
            color: "default",
            "&:hover": {
              color: "green",
            },
          }}
        >
          {type === "todoList" ? <EditIcon /> : <SaveIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Deletar" arrow>
        <IconButton
          edge="end"
          aria-label="deletar"
          onClick={onDelete}
          sx={{
            color: "default",
            "&:hover": {
              color: "red",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
