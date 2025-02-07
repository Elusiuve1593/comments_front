import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "10%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center", // Центрує контент по вертикалі
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Вирівнює елементи по центру
          width: "100%",
        }}
      >
        {/* Індикатор статусу */}
        <Box
          sx={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            backgroundColor: isAuthenticated ? "#58ec02c8" : "#3b8d0cc7",
          }}
        />

        {/* Кнопки */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginRight: "4%" }}>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/sign-in")}>
                Login
              </Button>
              /
              <Button color="inherit" onClick={() => navigate("/sign-up")}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
