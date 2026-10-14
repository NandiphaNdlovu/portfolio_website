import { Typography } from "@mui/material";
import { skillAreas, techStack } from "../../../../../data/skills.ts";
import { CardElement } from "../../../../atoms/Card/CardElement.tsx";
import ChipElement from "../../../../atoms/Chip/ChipElement.tsx";
import { Icon } from "../../../../atoms/Icon/Icon.tsx";
import { IconSize } from "../../../../atoms/Icon/icon.ts";

export function Skills() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="skills-heading">
      <Typography id="skills-heading" variant="h4" component="h2">
        Skills
      </Typography>

      <div>
        <Typography variant="h5" component="h3" className="pb-2">
          Tech stack
        </Typography>
        <ul className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li key={tech}>
              <ChipElement label={tech} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Typography variant="h5" component="h3" className="pb-2">
          What I do
        </Typography>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skillAreas.map((skill) => (
            <li key={skill.title}>
              <CardElement
                title={skill.title}
                subheader={skill.subheader}
                body={skill.body}
                avatar={<Icon iconName={skill.icon} size={IconSize.Lg} />}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
