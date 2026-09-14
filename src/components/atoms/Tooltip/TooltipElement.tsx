import Tooltip from "@mui/material/Tooltip";
import { ReactElement } from "react";

interface TooltipProps {
  title: string;
  children: ReactElement<unknown, any>;
}

export function TooltipElement({ title, children }: TooltipProps) {
  return (
    <Tooltip describeChild title={title} className="bg-blue-600">
      {children}
    </Tooltip>
  );
}
