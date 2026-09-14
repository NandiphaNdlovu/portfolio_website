import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

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

export default function TimelineElement({
  timelineItems,
  oppositeContent,
}: TimelineProps) {
  return (
    <Timeline position="alternate">
      {timelineItems?.map((item) => (
        <TimelineItem key={item.title}>
          <TimelineOppositeContent
            align="right"
            variant="body2"
            className="text-gray-500 self-center"
          >
            {item.date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {item.current ? (
              <TimelineDot variant="filled" color="secondary" />
            ) : (
              <TimelineDot variant="outlined" color="secondary" />
            )}

            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {item.title}
            </Typography>
            <Typography>{item.subtext}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
      {/* <TimelineItem>
        <TimelineOppositeContent
          align="right"
          variant="body2"
          sx={{
            color: "text.secondary",
            m: "auto 0",
          }}
        >
          {timelineItem}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          variant="body2"
          sx={{
            color: "text.secondary",
            m: "auto 0",
          }}
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          variant="body2"
          sx={{
            color: "text.secondary",
            m: "auto 0",
          }}
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          variant="body2"
          sx={{
            color: "text.secondary",
            m: "auto 0",
          }}
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem> */}
    </Timeline>
  );
}
