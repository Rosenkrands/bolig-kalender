import { Container, Typography } from "@mui/material";
import AppPage from "../Components/AppPage";
import AuthorizeView from "../Components/AuthorizeView";

export default function Tasks() {
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
            Opgaver
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Få overblik over dine opgaver
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Her på siden kan du se og administrere dine opgaver. Du kan oprette
            nye opgaver, redigere eksisterende opgaver og se hvordan de fordeler
            sig udover året.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="primary.light"
            sx={{ mb: 1 }}
          >
            Oversigt
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Opgaverne er organiseret kategori og du kan her tilføje, redigere
            eller slette opgaver.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="primary.light"
            sx={{ mb: 1 }}
          >
            Kalender
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Opgaverne vises i en kalenderoversigt, hvor du kan se, hvilke
            opgaver der er planlagt for måneden. Dette giver dig et klart
            overblik over, hvad der skal gøres, og hvornår det skal gøres.
          </Typography>
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
