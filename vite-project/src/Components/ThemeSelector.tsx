import React from "react";
import { useTheme } from "../main";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { COLOR_STORAGE_KEY, MODE_STORAGE_KEY } from "../consts";

const colorOptions = [
  { value: "lightPink", label: "Light Pink" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

export default function ThemeSelector() {
  const { color, setColor, mode, toggleMode } = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleColorChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (value) {
      setColor(value as typeof color);
      localStorage.setItem(COLOR_STORAGE_KEY, value);
    }
  };

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: "light" | "dark" | null
  ) => {
    if (value && value !== mode) {
      toggleMode();
      localStorage.setItem(MODE_STORAGE_KEY, value);
    }
  };

  return (
    <>
      <PaletteIcon
        sx={{ cursor: "pointer" }}
        fontSize="medium"
        onClick={() => setOpen(true)}
        role="button"
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography variant="h4" component="div">
            Theme
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1 }}>
            Select your preferred theme color and mode.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" component="div">
              Theme Color
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup
                value={color}
                onChange={handleColorChange}
                name="theme-color"
              >
                {colorOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" component="div">
              Theme Mode
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleModeChange}
                aria-label="theme mode"
                size="small"
              >
                <ToggleButton value="light" aria-label="light mode">
                  Light
                </ToggleButton>
                <ToggleButton value="dark" aria-label="dark mode">
                  Dark
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
