import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import AppPage from "../Components/AppPage.tsx";
import AuthorizeView from "../Components/AuthorizeView.tsx";

export default function Home() {
  // helpers
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  return (
    <AuthorizeView>
      <AppPage>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            color="primary.light"
            component="h1"
            sx={{ mb: 2 }}
          >
            Welcome to BoligKalender!
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            Welcome to the BoligKalender! This application is designed to
            demonstrate the integration of Material-UI components with a React
            application. Explore the various features and components that we
            have implemented to help you get started with your own projects.
            Check out the new additions to the repository, including the ASP.NET
            Core backend, Docker setup, and database migrations, for more
            examples and features.
          </Typography>
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
