import {
  Alert,
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import AppPage from "../Components/AppPage.tsx";
import AuthorizeView from "../Components/AuthorizeView.tsx";
import { useEffect, useState } from "react";
import { HousingType } from "../enums.ts";
import axios from "axios";

export default function Home() {
  // states
  const [housingType, setHousingType] = useState<HousingType | "">("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
        setHousingType(response.data.housingType ?? "");
      })
      .catch((error) => {
        console.error("Failed to fetch housing type:", error);
        setError("Failed to load housing type.");
      });
  }, []);

  const handleHousingTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as HousingType;
    setHousingType(value);
    // Save the selected housing type to local storage or send it to the API
    // localStorage.setItem("housingType", value);
    axios
      .post("/api/housing-type", { housingType: value })
      .then(() => {
        console.log("Housing type saved successfully.");
        setMessage("Housing type updated successfully.");
      })
      .catch((error) => {
        console.error("Failed to save housing type:", error);
        setError("Failed to save housing type.");
      });
  };

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
            Velkommen til BoligKalender!
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Din boligkalender for nem planlægning af vedligeholdelse og opgaver
            henover året.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            BoligKalender hjælper dig med at holde styr på vigtige datoer og
            opgaver i dit hjem. Uanset om du bor i en lejlighed, et hus eller en
            anden boligtype, kan du tilpasse din kalender til dine behov.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Kom godt i gang
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            For at komme i gang med BoligKalender, skal du først vælge din
            boligtype. Dette hjælper os med at tilpasse kalenderen til dine
            specifikke behov og opgaver.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Når du har valgt din boligtype, kan du begynde at udforske
            funktionerne i BoligKalender. Vi håber, at du vil finde det nyttigt
            til at holde styr på dine boligrelaterede opgaver og
            vedligeholdelse.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Vælg boligtype
          </Typography>
          <Box width={"100%"} sx={{ mb: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
          </Box>
          <FormControl fullWidth>
            <InputLabel id="select-housing-type-label">Boligtype</InputLabel>
            <Select
              labelId="select-housing-type-label"
              id="select-housing-type"
              value={housingType ?? ""}
              label="Boligtype"
              onChange={handleHousingTypeChange}
              disabled={error !== ""}
            >
              <MenuItem value="">
                <em>Vælg boligtype</em>
              </MenuItem>
              <MenuItem value={HousingType.House}>{HousingType.House}</MenuItem>
              <MenuItem value={HousingType.Apartment}>
                {HousingType.Apartment}
              </MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ my: 2 }} />
          {housingType && (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Foreslåede opgaver baseret på din boligtype
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Du har valgt <strong>{housingType}</strong> som din boligtype.
                Dette vil hjælpe os med at tilpasse BoligKalender til dine
                specifikke behov. Du kan nu begynde at tilføje opgaver og
                planlægge vedligeholdelse baseret på din boligtype.
              </Typography>
            </>
          )}
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
