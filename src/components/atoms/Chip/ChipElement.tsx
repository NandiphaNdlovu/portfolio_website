import { Chip } from "@mui/material";

interface ChipProps {
  label: string;
  variant?: "filled" | "outlined";
}

export default function ChipElement({ label, variant = "outlined" }: ChipProps) {
  return <Chip label={label} variant={variant} />;
}
