import { Chip } from "@mui/material";
import { ReactElement } from "react";

interface ChipProps {
  children: ReactElement<unknown, any>;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  onDelete?: ((event: any) => void) | undefined;
}

export default function ChipElement({
  children,
  onClick,
  onDelete,
}: ChipProps) {
  return (
    <>
      <Chip
        label="Custom delete icon"
        onClick={onClick}
        onDelete={onDelete}
        deleteIcon={children}
      />
      <Chip
        label="Custom delete icon"
        onClick={onClick}
        onDelete={onDelete}
        deleteIcon={children}
        variant="outlined"
      />
    </>
  );
}
