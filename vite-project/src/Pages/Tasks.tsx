import { Alert, Box, Container, Divider, Typography } from "@mui/material";
import AppPage from "../Components/AppPage";
import AuthorizeView from "../Components/AuthorizeView";
import CreateMaintenanceTask from "../Components/MaintenanceTask/CreateMaintenanceTask.tsx";
import DisplayMaintenanceTasks from "../Components/MaintenanceTask/DisplayMaintenanceTasks.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { HousingType } from "../enums.ts";

export default function Tasks() {
  // states
  const [housingType, setHousingType] = useState<HousingType | "">("");
  const [error, setError] = useState<string>("");

  // functions
  useEffect(() => {
    // Load the user's housing type from local storage or API
    // const storedHousingType = localStorage.getItem("housingType");
    // if (storedHousingType) {
    //   setHousingType(storedHousingType as HousingType);
    // }

    // You can also fetch the housing type from an API if needed
    axios
      .get("/api/housing-type")
      .then((response) => {
        console.log("Fetched housing type:", response.data);
        setHousingType(response.data ?? "");
      })
      .catch((error) => {
        console.error("Failed to fetch housing type:", error);
        setError("Failed to load housing type.");
      });
  }, []);

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
          <Divider sx={{ my: 2 }} />
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
          <Box sx={{ mb: 2 }}>
            <CreateMaintenanceTask />
          </Box>
          {housingType && <DisplayMaintenanceTasks housingType={housingType} />}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Divider sx={{ my: 2 }} />
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
