import {
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
import { useState } from "react";
import { HousingType } from "../enums.ts";

export default function Home() {
  const [housingType, setHousingType] = useState<HousingType | null>(null);

  const handleHousingTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as HousingType;
    setHousingType(value);
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
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>
            Vælg boligtype
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="select-housing-type-label">Boligtype</InputLabel>
            <Select
              labelId="select-housing-type-label"
              id="select-housing-type"
              value={housingType ?? ""}
              label="Boligtype"
              onChange={handleHousingTypeChange}
            >
              <MenuItem value={HousingType.House}>{HousingType.House}</MenuItem>
              <MenuItem value={HousingType.Apartment}>
                {HousingType.Apartment}
              </MenuItem>
            </Select>
          </FormControl>
        </Container>
      </AppPage>
    </AuthorizeView>
  );
}
