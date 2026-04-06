import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#3f3e3e",
    },
  },
});