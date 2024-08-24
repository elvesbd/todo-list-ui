import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackButtonProps {
  readonly route: string;
}

export default function BackButton({ route }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(route);
  };

  return (
    <Tooltip title="Voltar" arrow>
      <IconButton onClick={handleBack} color="primary">
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
