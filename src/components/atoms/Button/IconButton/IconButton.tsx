import { IconButton, Tooltip } from "@mui/material";

export interface IconButtonProps {
  tooltipTitle?: string;
  /** Accessible name; falls back to the tooltip title. Icon-only buttons need one. */
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  /** Renders the button as a link. */
  href?: string;
  /** Opens the link in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  /** Downloads the linked file instead of navigating. */
  download?: string;
  icon?: JSX.Element & React.ReactNode;
}

export function IconButtonElement({
  tooltipTitle,
  ariaLabel,
  onClick,
  href,
  external,
  download,
  icon,
}: IconButtonProps) {
  const linkProps = href
    ? {
        href,
        download,
        ...(external && { target: "_blank", rel: "noopener noreferrer" }),
      }
    : {};

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton
        size="large"
        aria-label={ariaLabel ?? tooltipTitle}
        onClick={onClick}
        {...linkProps}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
