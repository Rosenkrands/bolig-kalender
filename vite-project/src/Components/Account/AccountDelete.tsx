import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

export default function AccountDelete() {
  // helpers
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  const handleDeleteAccount = () => {
    axios
      .post("/api/deleteaccount")
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete account.");
      });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        spacing={isSmallScreen ? 2 : 6}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4" color="primary.light" gutterBottom>
            Account Deletion
          </Typography>
          <Typography variant="body1" gutterBottom>
            Deleting your account is a permanent action. All your data will be
            removed from our system. If you are sure you want to delete your
            account, please click the delete button.
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
          <Button
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleDeleteAccount()}
          >
            Delete Account
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
