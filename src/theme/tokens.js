// Single source of truth for design tokens. CommonJS so tailwind.config.js and
// the MUI theme (src/theme/theme.ts) can both read it.
module.exports = {
  // Brand purple: indicators, glows and hover tints.
  accent: "#c084fc",
  // Darker purple for text on the glass panels (the light accent fails contrast).
  accentStrong: "#7e22ce",
  accentGlow: "rgba(168, 85, 247, 0.8)",
  accentShadow: "#420D4B",
  // Muted body/inactive text that stays readable on the glass panels.
  textMuted: "#4b5563",
  glass: "rgba(255, 255, 255, 0.5)",
  glassSoft: "rgba(255, 255, 255, 0.3)",
  glassFaint: "rgba(255, 255, 255, 0.1)",
};
