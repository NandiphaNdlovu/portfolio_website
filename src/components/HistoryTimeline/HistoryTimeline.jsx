import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import BadgeIcon from "@mui/icons-material/Badge";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Cursor } from "react-bootstrap-icons";

export function HistoryTimeline() {
  return (
    // TODO: add a timeline Title
    <Timeline position="alternate">
      {/* High School */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="white"
        >
          2015 - 2019
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <Tooltip title={"Lowveld High School"} placement="top">
            <TimelineDot
              color="secondary"
              variant="outlined"
              style={{ cursor: "pointer" }}
            >
              <LocalLibraryIcon />
            </TimelineDot>
          </Tooltip>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            High School
          </Typography>
          <Typography>Matriculated 2019</Typography>
        </TimelineContent>
      </TimelineItem>

      {/* University */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="white"
        >
          2021
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot
            color="secondary"
            variant="outlined"
            style={{ cursor: "pointer" }}
          >
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            University
          </Typography>
          <Typography>Belgium Campus Itversity</Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Peer tutor */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="white"
        >
          2022
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <Tooltip title={"Belgium Campus ItVersity"} placement="top">
            <TimelineDot
              color="secondary"
              variant="outlined"
              style={{ cursor: "pointer" }}
            >
              <LocalLibraryIcon />
            </TimelineDot>
          </Tooltip>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Part Time
          </Typography>
          <Typography>Peer tutor</Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Internship */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="white"
        >
          2024
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot
            color="secondary"
            variant="outlined"
            style={{ cursor: "pointer" }}
          >
            <WorkIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Internship
          </Typography>
          <Typography>
            Graduate Software Engineer at Altron Healthtech
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Graduation */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="white"
        >
          2025
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <Tooltip title={"Belgium Campus ItVersity"} placement="top">
            <TimelineDot
              color="secondary"
              variant="outlined"
              style={{ cursor: "pointer" }}
            >
              <CardMembershipIcon />
            </TimelineDot>
          </Tooltip>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Graduation
          </Typography>
          <Typography>Bachelor of of Computing (NQL Level 8)</Typography>
        </TimelineContent>
      </TimelineItem>

      {/* First permanent */}
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="secondary"
        >
          Current
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="secondary" style={{ cursor: "pointer" }}>
            <BadgeIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>

        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" color="secondary">
            Employer
          </Typography>
          <Typography color="secondary">
            Junior Software Engineer at Altron Healthtech
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
