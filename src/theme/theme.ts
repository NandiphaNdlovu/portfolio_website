import { alpha, createTheme } from "@mui/material/styles";
import tokens from "./tokens.js";

const scoopMask = (position: string) =>
  `radial-gradient(circle at ${position}, transparent 16px, black 16.5px)`;

// Component overrides live here (not in App.css / `!important` utility classes)
// so the whole look is driven from tokens.js.
export const theme = createTheme({
  palette: {
    primary: { main: tokens.accent, dark: tokens.accentStrong },
    text: { secondary: tokens.textMuted },
  },
  components: {
    MuiAppBar: {
      defaultProps: { color: "transparent", elevation: 0 },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "transparent" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: tokens.accentStrong },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 300ms",
          "&:hover": {
            backgroundColor: alpha(tokens.accent, 0.1),
            color: tokens.accentStrong,
            filter: `drop-shadow(0 0 8px ${tokens.accentGlow})`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.glassFaint,
          borderRadius: 16,
          boxShadow: `0 2px 5px ${tokens.accentShadow}`,
        },
      },
    },
    // Browser-style tabs with concave "scooped" bottom corners.
    MuiTab: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          position: "relative",
          overflow: "visible",
          minWidth: "auto",
          minHeight: "auto",
          padding: "12px 16px",
          [t.breakpoints.up("sm")]: { padding: "12px 28px" },
          color: tokens.textMuted,
          background: tokens.glass,
          borderRadius: "16px 16px 0 0",
          backdropFilter: "blur(12px)",
          "&.Mui-selected": {
            color: tokens.accentStrong,
            filter: `drop-shadow(0 10px 10px ${tokens.accentGlow})`,
          },
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            width: 16,
            height: 16,
            background: tokens.glass,
          },
          "&::before": {
            left: -16,
            maskImage: scoopMask("0 0"),
            WebkitMaskImage: scoopMask("0 0"),
          },
          "&::after": {
            right: -16,
            maskImage: scoopMask("100% 0"),
            WebkitMaskImage: scoopMask("100% 0"),
          },
        }),
      },
    },
    // The content card that sits under the tabs.
    MuiTabPanel: {
      styleOverrides: {
        root: {
          background: tokens.glass,
          borderRadius: "0 16px 16px 16px",
        },
      },
    },
  },
});
