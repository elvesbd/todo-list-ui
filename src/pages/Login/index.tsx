import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { useLogin } from "./useLogin";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const {
    email,
    error,
    loading,
    password,
    showPassword,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleClickShowPassword,
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
            variant="outlined"
            aria-label="Senha"
            placeholder="senha"
            value={password}
            disabled={loading}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            sx={{
              backgroundColor: "#fff",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
