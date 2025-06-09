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
            <Stack direction="row" spacing={1} sx={{ marginBottom: 1 }}>
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
            <Stack direction="row" spacing={1}>
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
      title: "Check Heating System",
      description: "Ensure the heating system is functioning properly.",
      HousingTypes: [HousingType.House, HousingType.Apartment],
      RelevantMonths: [1, 2, 3, 10, 11, 12],
    },
    {
      id: "2",
      title: "Inspect Roof",
      description: "Check for any damage or leaks in the roof.",
      HousingTypes: [HousingType.House],
      RelevantMonths: [4, 5, 6],
    },
    {
      id: "3",
      title: "Clean Gutters",
      description: "Remove debris from gutters to prevent blockages.",
      HousingTypes: [HousingType.House],
      RelevantMonths: [7, 8, 9],
    },
  ];

  return (
    // <Card
    //   variant="outlined"
    //   sx={{ backgroundColor: "primary.light", color: "primary.contrastText" }}
    // >
    //   <CardContent>
    <>
      <Typography variant="h5" gutterBottom>
        Vedligeholdelsesopgaver for {housingType.toLocaleLowerCase()}
      </Typography>
      <Stack spacing={2}>
        {maintenanceTasks.map((task) => (
          <MaintenanceTaskPreview key={task.id} task={task} />
        ))}
      </Stack>
    </>
    //   </CardContent>
    // </Card>
  );
}
