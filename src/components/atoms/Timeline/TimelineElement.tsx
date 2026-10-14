import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TimelineProps {
  oppositeContent?: string;
  timelineItems: ITimelineItems[] | undefined;
}

export interface ITimelineItems {
  title: string;
  subtext?: string;
  date?: string;
  current?: boolean;
}

export default function TimelineElement({ timelineItems }: TimelineProps) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Timeline
      position={compact ? "right" : "alternate"}
      sx={
        compact
          ? {
              padding: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }
          : undefined
      }
    >
      {timelineItems?.map((item) => (
        <TimelineItem key={`${item.title}-${item.date}`}>
          {!compact && (
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
              className="self-center"
            >
              {item.date}
            </TimelineOppositeContent>
          )}
          <TimelineSeparator>
            <TimelineDot
              variant={item.current ? "filled" : "outlined"}
              color="secondary"
            />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="h3">
              {item.title}
            </Typography>
            <Typography>{item.subtext}</Typography>
            {compact && item.date && (
              <Typography variant="body2" color="text.secondary">
                {item.date}
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
