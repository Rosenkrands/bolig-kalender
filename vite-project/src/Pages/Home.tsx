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
            Welcome to the Sample App!
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            Welcome to the Sample App! This application is designed to
            demonstrate the integration of Material-UI components with a React
            application. Explore the various features and components that we
            have implemented to help you get started with your own projects.
            Check out the new additions to the repository, including the ASP.NET
            Core backend, Docker setup, and database migrations, for more
            examples and features.
          </Typography>
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
            <Card
              variant="elevation"
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  Frontend
                </Typography>
                <Typography variant="body2" component="p">
                  The frontend of this application is built using React, a
                  popular JavaScript library for building user interfaces. It
                  leverages Material-UI for styling and component design.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="elevation"
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              }}
            >
              {" "}
              <CardContent>
                <Typography variant="h5" component="h2">
                  Backend
                </Typography>
                <Typography variant="body2" component="p">
                  The backend is powered by ASP.NET Core Minimal API, a
                  lightweight framework for building fast and efficient web APIs
                  with minimal overhead.
                </Typography>
              </CardContent>
            </Card>
            <Card
              variant="elevation"
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                color: "primary.contrastText",
              }}
            >
              {" "}
              <CardContent>
                <Typography variant="h5" component="h2">
                  Database
                </Typography>
                <Typography variant="body2" component="p">
                  The database used in this application is PostgreSQL, a
                  powerful, open-source object-relational database system known
                  for its reliability and performance.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Typography
            variant="h4"
            color="primary.light"
            component="h2"
            sx={{ mt: 4, mb: 1 }}
          >
            Getting Started
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            To get started with this application, you can clone the{" "}
            <a
              href="https://github.com/rosenkrands/sample-react-app"
              color="primary"
              target="_blank"
            >
              repository
            </a>{" "}
            and follow the instructions in the README file. The application is
            designed to be easily extensible, so feel free to modify and add
            features as needed.
          </Typography>
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
