import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Copyright from "../Components/Copyright";
import axios from "axios";
import { useNavigate } from "react-router";
import ThemeSelector from "../Components/ThemeSelector";

export default function Login() {
  // helpers
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // functions
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    axios
      .post(
        `/api/login?useCookies=true`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError(
          "Login failed. Please make sure you are using a valid email and password."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1300, // above Paper
        }}
      >
        <ThemeSelector />
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography component="h1" variant={isSmallScreen ? "h6" : "h5"}>
              Sign in to
            </Typography>
            <img src="app-logo.svg" alt="sample app logo" height="30px" />
            <Typography component="h1" variant={isSmallScreen ? "h6" : "h5"}>
              <strong>BoligKalender</strong>
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: { target: { value: any } }) =>
                setEmail(e.target.value)
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: { target: { value: any } }) =>
                setPassword(e.target.value)
              }
            />
            {error && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Button href="/register" fullWidth variant="outlined">
            Register
          </Button>
          <Box sx={{ mt: 2 }}>
            <Copyright />
          </Box>
        </Paper>
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
