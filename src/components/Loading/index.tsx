import { Box, CircularProgress } from "@mui/material";

interface LoadingProps {
  size?: number;
  height?: string;
}

export default function Loading({ size = 40, height = "100vh" }: LoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
