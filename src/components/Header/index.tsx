import { Typography, Box, Button } from "@mui/material";

interface HeaderProps {
  readonly title: string;
  readonly buttonText: string;
  readonly onButtonClick: () => void;
}

export default function Header({
  title,
  buttonText,
  onButtonClick,
}: HeaderProps) {
  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "24px",
        }}
      >
        <Button variant="contained" color="primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Box>
    </div>
  );
}
