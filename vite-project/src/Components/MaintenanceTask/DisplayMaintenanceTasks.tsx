import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HousingType } from "../../enums";
import { MaintenanceTask } from "../../interfaces";
import axios from "axios";
import { useState, useEffect } from "react";

function MaintenanceTaskPreview({ task }: Readonly<{ task: MaintenanceTask }>) {
  // functions
  const handleDelete = () => {
    // Implement delete functionality here
    alert(
      `Trying to delete task id: ${task.id}. Delete functionality not implemented yet`
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        position: "relative",
      }}
    >
      <CardContent sx={{ position: "relative" }}>
        {/* Delete button at top right */}
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <Tooltip title="Slet opgave">
            <IconButton
              aria-label="Slet opgave"
              size="small"
              sx={{ color: "primary.contrastText" }}
              onClick={() => handleDelete()}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
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
              {task.housingTypes.map((type) => (
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
              {task.relevantMonths.map((month) => (
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
  // states
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(
    []
  );
  const [error, setError] = useState<string>("");

  // functions
  useEffect(() => {
    // Fetch maintenance tasks from the API
    axios
      .get("/api/maintenance-tasks")
      .then((response) => {
        console.log("Fetched maintenance tasks:", response.data);
        setMaintenanceTasks(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch maintenance tasks:", error);
        setError("Failed to fetch maintenance tasks");
      });
  }, []);

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
      {error && (
        <Box width={"100%"} sx={{ mb: 1 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </>
  );
}
