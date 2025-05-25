import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  Paper,
  Alert,
  Stack,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Copyright from "../Components/Copyright";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  // helpers
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // functions
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    axios
      .post(`/api/register`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.title) {
          setError(error.response.data.title);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
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
              Register at
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Typography variant="body1" component="p">
              Already have an account? <Link href="/signin">Login</Link>
            </Typography>
          </Box>
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
