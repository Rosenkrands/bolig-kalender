import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountInformation() {
  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // functions
  useEffect(() => {
    axios
      .get("/api/account")
      .then((response) => {
        setFirstName(response.data.firstName ?? "");
        setLastName(response.data.lastName ?? "");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load account information.");
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("/api/account", { firstName, lastName })
      .then(() => {
        setMessage("Account information updated successfully.");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to update account information.");
      });
  };

  // helpers
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={isSmallScreen ? 2 : 6}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" color="primary.light" gutterBottom>
            Account Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here you can add information about yourself. This information will
            be used to personalize your experience on our platform. You can
            update this information at any time.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Box width={"100%"}>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
