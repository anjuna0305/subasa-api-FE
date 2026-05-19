import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: grey[800] },
    secondary: { main: "#fff" },
    background: {
      default: "#fff",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px",
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#fff" },
    secondary: { main: "#ccc" },
    background: {
      default: "#3f3e3e",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});
