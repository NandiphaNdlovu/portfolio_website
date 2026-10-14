import { Typography } from "@mui/material";
import { experience } from "../../../../../data/experience.ts";
import TimelineElement from "../../../../atoms/Timeline/TimelineElement.tsx";

export function Experience() {
  return (
    <section aria-labelledby="experience-heading">
      <Typography id="experience-heading" variant="h4" component="h2">
        Experience
      </Typography>
      <TimelineElement timelineItems={experience} />
    </section>
  );
}
