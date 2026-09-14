import { IconButton, Tooltip } from "@mui/material";

export interface IconButtonProps {
  tooltipTitle?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  icon?: JSX.Element & React.ReactNode;
}

export function IconButtonElement({
  tooltipTitle,
  onClick,
  icon,
}: IconButtonProps) {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        className="transition-all duration-300 hover:bg-purple-500/10 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
        size="large"
        aria-haspopup="true"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
