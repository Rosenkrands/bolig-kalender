import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function CreateMaintenanceTask() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTask = () => {
    // Logic to create the maintenance task goes here
    console.log("Creating maintenance task...");
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
