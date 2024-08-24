import { ReactNode } from "react";
import { Box, Button, AppBar, Toolbar, Typography } from "@mui/material";

import useAuth from "../../hooks/auth/useAuth";

interface LayoutProps {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f6f5fc" }}>
        <Toolbar sx={{ color: "#333" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </>
  );
}
