import { Button, Typography } from "@mui/material";
import { profile, profileLinks } from "../../../../../data/profile.ts";
import { education } from "../../../../../data/experience.ts";
import { Icon } from "../../../../atoms/Icon/Icon.tsx";
import { IconSize } from "../../../../atoms/Icon/icon.ts";

export function AboutMe() {
  const cv = profileLinks.find((link) => link.download);

  return (
    <section className="flex flex-col gap-6" aria-labelledby="about-heading">
      <div className="flex flex-col gap-2">
        <Typography id="about-heading" variant="h4" component="h2">
          About Me
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {profile.name} · {profile.title}
        </Typography>
        <Typography className="max-w-prose">{profile.summary}</Typography>
        {cv && (
          <div>
            <Button
              variant="contained"
              href={cv.href}
              download={cv.download}
              startIcon={<Icon iconName={cv.icon} size={IconSize.Md} />}
            >
              {cv.label}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h5" component="h3">
          Education
        </Typography>
        <ul className="flex flex-col gap-2">
          {education.map((item) => (
            <li key={item.title}>
              <Typography fontWeight={500}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.institution} · {item.date}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
