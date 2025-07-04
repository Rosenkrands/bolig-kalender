import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { HousingType } from "../../enums";

interface MaintenanceTask {
  id?: string;
  title: string;
  description: string;
  HousingTypes: string[];
  RelevantMonths: number[];
}

function MaintenanceTaskPreview({ task }: Readonly<{ task: MaintenanceTask }>) {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body1">{task.description}</Typography>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
          spacing={1}
          marginTop={2}
        >
          <Box>
            <Typography variant="subtitle1">Relevant for boligtype</Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap={true}
              flexWrap={"wrap"}
              sx={{ marginBottom: 1 }}
            >
              {task.HousingTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{ color: "primary.contrastText" }}
                />
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1">Relevante måneder</Typography>
            <Stack direction="row" useFlexGap flexWrap={"wrap"} spacing={1}>
              {task.RelevantMonths.map((month) => (
                <Chip
                  key={month}
                  label={`${month}`}
                  sx={{ color: "primary.contrastText" }}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DisplayMaintenanceTasks(
  { housingType }: Readonly<{ housingType: HousingType }> // Default value to avoid undefined errors
) {
  // Get the maintenance tasks from the API or state
  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: "1",
      title: "Tjek varmesystem",
      description: "Sørg for, at varmesystemet fungerer korrekt.",
      HousingTypes: [HousingType.House, HousingType.Apartment],
      RelevantMonths: [1, 2, 3, 10, 11, 12],
    },
    {
      id: "2",
      title: "Inspicer tag",
      description: "Tjek for skader eller utætheder på taget.",
      HousingTypes: [HousingType.House],
      RelevantMonths: [4, 5, 6],
    },
    {
      id: "3",
      title: "Rens tagrender",
      description: "Fjern snavs fra tagrender for at undgå tilstopning.",
      HousingTypes: [HousingType.House],
      RelevantMonths: [7, 8, 9],
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Vedligeholdelsesopgaver for <strong>{housingType}</strong>
      </Typography>
      <Stack spacing={2}>
        {maintenanceTasks.map((task) => (
          <MaintenanceTaskPreview key={task.id} task={task} />
        ))}
      </Stack>
    </>
  );
}
