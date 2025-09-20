import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f9fafb", // overall app bg
      paper: "#f3f4f6", // cards, surfaces
    },
    text: {
      primary: "#111827", // main text (almost black)
      secondary: "#374151", // for column titles
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f9fafb", // same as overall bg
          borderRadius: "1rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111827", // near-black (gray-900)
      paper: "#1f2937", // dark gray (gray-800)
    },
    text: {
      primary: "#f9fafb", // near-white
      secondary: "#d1d5db", // light gray
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          borderRadius: "1rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});
