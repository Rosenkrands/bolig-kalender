import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router";
import AppPage from "../Components/AppPage.tsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AuthorizeView from "../Components/AuthorizeView.tsx";

export default function NotFound() {
  // helpers
  const navigate = useNavigate();

  // functions
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <AuthorizeView>
      <AppPage>
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            p={2}
          >
            <Box display="flex">
              <ErrorOutlineIcon color="primary" sx={{ fontSize: 100, mb: 2 }} />
              <Typography variant="h1" color="primary" gutterBottom>
                404
              </Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
              Oops! Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoHome}
              sx={{ mt: 2 }}
            >
              Go to Home
            </Button>
          </Box>
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
