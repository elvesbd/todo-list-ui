import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { useLogin } from "./useLogin";

export default function Login() {
  const {
    email,
    error,
    loading,
    password,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
  } = useLogin();

  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "36px",
          height: "36px",
          bgcolor: "#1976d2",
          borderRadius: "50%",
        }}
      >
        <LockIcon sx={{ color: "#fff" }} />
      </Box>

      <Typography align="center" variant="h5" mb={2}>
        Login
      </Typography>

      <Box
        gap={2}
        component="form"
        width="100%"
        display="flex"
        maxWidth="24rem"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <TextField
            required
            type="email"
            variant="outlined"
            placeholder="e-mail"
            aria-label="Endereço de e-mail"
            value={email}
            disabled={loading}
            onChange={handleEmailChange}
            sx={{
              backgroundColor: "#fff",
            }}
          />
        </FormControl>

        <FormControl>
          <TextField
            required
            type="password"
            variant="outlined"
            placeholder="senha"
            aria-label="Senha"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
            sx={{
              backgroundColor: "#fff",
            }}
          />
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Entrar"}
        </Button>
      </Box>
    </Box>
  );
}
