import { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export interface CardProps {
  title: string;
  subheader?: string;
  body?: string;
  avatar?: JSX.Element & ReactNode;
  action?: JSX.Element & ReactNode;
  children?: ReactNode;
}

export interface CardItem {
  title: string;
  subheader?: string;
  body?: string;
  avatar?: JSX.Element & ReactNode;
  action?: JSX.Element & ReactNode;
}

export function CardElement({
  title,
  subheader,
  body,
  avatar,
  action,
  children,
}: CardProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader
        avatar={avatar && <span className="text-accent-strong">{avatar}</span>}
        action={action}
        title={title}
        subheader={subheader}
      />
      {(body || children) && (
        <CardContent>
          {body && (
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          )}
          {children}
        </CardContent>
      )}
    </Card>
  );
}
