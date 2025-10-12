import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { HousingType } from "../../enums";
import axios from "axios";

export default function CreateMaintenanceTask({
  onTaskCreated,
}: Readonly<{
  onTaskCreated?: () => void;
}>) {
  const [open, setOpen] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [relevantMonths, setRelevantMonths] = useState<number[]>([]);
  const [housingTypes, setHousingTypes] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form fields when closing the dialog
    setTaskTitle("");
    setTaskDescription("");
    setRelevantMonths([]);
    setHousingTypes([]);
  };

  const handleCreateTask = () => {
    // Logic to create the maintenance task goes here
    console.log("Creating maintenance task...");
    axios
      .post("/api/maintenance-tasks", {
        title: taskTitle,
        description: taskDescription,
        relevantMonths: relevantMonths,
        housingTypes: housingTypes,
      })
      .then(() => {
        // After creating the task, you might want to close the dialog
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating maintenance task:", error);
        alert("Der opstod en fejl under oprettelse af opgaven. Prøv igen.");
      });

    // Notify parent component to refresh the task list
    if (onTaskCreated) {
      onTaskCreated();
    }

    // After creating the task, you might want to close the dialog
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Tilføj opgave
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Opret vedligeholdelsesopgave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Formular til oprettelse af vedligeholdelsesopgave
          </DialogContentText>
          {/* Here you would include your form fields for creating a maintenance task */}
          <Box component={"form"} sx={{ mt: 2 }}>
            <TextField
              label="Opgavens Titel"
              fullWidth
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <TextField
              label="Beskrivelse af opgaven"
              fullWidth
              multiline
              rows={4}
              onChange={(e) => setTaskDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Card variant="outlined" sx={{ mt: 2, p: 1 }}>
              <CardContent sx={{ pt: 0, pb: 0 }}>
                <Typography variant="subtitle2">
                  Angiv månederne hvor opgaven er relevant
                </Typography>
              </CardContent>

              <Box display={"flex"} justifyContent={"center"} flexWrap="wrap">
                {Array.from({ length: 12 }, (_, i) => (
                  <FormControlLabel
                    sx={{ mt: 1, mr: 0, ml: 0 }}
                    key={i + 1}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setRelevantMonths((prev) => {
                            if (isChecked) {
                              return [...prev, i + 1];
                            } else {
                              return prev.filter((month) => month !== i + 1);
                            }
                          });
                        }}
                      />
                    }
                    labelPlacement="top"
                    label={String(i + 1)}
                  />
                ))}
              </Box>
            </Card>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="housing-type-label">
                Relevante boligtyper
              </InputLabel>
              <Select
                labelId="housing-type-label"
                multiple
                value={housingTypes}
                onChange={(e) => {
                  const value = e.target.value as string[];
                  setHousingTypes(value);
                }}
                input={<OutlinedInput label="Relevante boligtyper" />}
              >
                {Object.values(HousingType).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Vælg de boligtyper, som opgaven er relevant for
              </FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuller</Button>
          <Button
            onClick={handleCreateTask}
            color="primary"
            variant="contained"
          >
            Opret opgave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
