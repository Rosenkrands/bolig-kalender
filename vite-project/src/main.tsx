import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { themes } from "./theme";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLOR_STORAGE_KEY, MODE_STORAGE_KEY } from "./consts";

// colorOptions: Array of available theme color keys from the themes object.
const colorOptions = Object.keys(themes) as Array<keyof typeof themes>;

// Color: Type representing valid color keys for themes.
type Color = (typeof colorOptions)[number];

type Mode = "light" | "dark";

type ThemeContextType = {
  toggleMode: () => void;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
  color: Color;
  mode: Mode;
};

const defaultColor: Color = "green";

const ThemeContext = React.createContext<ThemeContextType>({
  toggleMode: () => {},
  setColor: () => {},
  color: defaultColor,
  mode: "light",
});

const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Read from localStorage or fallback to defaults
  const getInitialColor = (): Color => {
    const stored = localStorage.getItem(COLOR_STORAGE_KEY);
    return stored && Object.keys(themes).includes(stored)
      ? (stored as Color)
      : defaultColor;
  };

  const getInitialMode = (): Mode => {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);

    if (!stored) {
      // If no mode is stored, use prefersDarkMode
      return prefersDarkMode ? "dark" : "light";
    }

    return stored === "dark" ? "dark" : "light";
  };

  const [mode, setMode] = React.useState<Mode>(getInitialMode());
  const [color, setColor] = React.useState<Color>(getInitialColor());

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  // Update mode if system preference changes and no value in storage
  React.useEffect(() => {
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    if (!stored) setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = React.useMemo(() => themes[color][mode], [color, mode]);

  const contextValue = React.useMemo(
    () => ({ toggleMode, setColor, color, mode }),
    [toggleMode, setColor, color, mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProviderWrapper>
  </React.StrictMode>
);
