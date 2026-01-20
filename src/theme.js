import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1", // richer indigo
      contrastText: "#fff",
    },
    secondary: {
      main: "#00acc1", // teal accent
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#6b7280",
    },
    divider: "rgba(15,23,42,0.08)",
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  typography: {
    fontFamily: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"].join(
      ",",
    ),
    h4: {
      fontWeight: 700,
      fontSize: "1.6rem",
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.95rem",
      color: "#0f172a",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          paddingLeft: 14,
          paddingRight: 14,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 8px 28px rgba(15,23,42,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#5b99f5ff",
          color: "#f4f7f8ff",
          boxShadow: "0 4px 18px rgba(15,23,42,0.06)",
        },
      },
    },
  },
});

export default theme;
