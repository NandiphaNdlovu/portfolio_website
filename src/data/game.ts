import { IconType, IconTypeMUI } from "../components/atoms/Icon/icon.ts";
import { projectsRoute } from "../routing/routes.ts";
import { profile, profileLinks } from "./profile.ts";
import { techStack } from "./skills.ts";

export const WORDS_PER_LEVEL = 5;

export const gameWords: string[] = [
  ...techStack,
  // Work
  "Software Engineer",
  "Altron Healthtech",
  "Graduate Developer",
  "Peer Tutor",
  "DataBox",
  "Healthcare Tech",
  "Sandton",
  "Pretoria",
  "White River",
  // Study
  "BCompSc",
  "Computer Science",
  "Belgium Campus",
  "NQF Level 8",
  "Class of 2025",
  // How I work
  "Problem Solver",
  "Collaboration",
  "Debugging",
  "Testing",
  "Frontend",
  "Backend",
  "Databases",
  "CI/CD",
  "AI Integration",
  "Always Learning",
  // Beyond code
  "Crocheting",
  "Minecraft Mods",
  "Hiking",
  "Volunteer",
  "GEM/BEM",
  "English",
  "Siswati",
  "Afrikaans",
  "South Africa",
];

export interface Unlock {
  id: string;

  title: string;

  label: string;
  icon: IconType | IconTypeMUI;
  href: string;
  kind: "mailto" | "external" | "download" | "internal";
  download?: string;
}

const cv = profileLinks.find((link) => link.download);

/**
 * the first entry unlocks at level 1, the next at level 2, etc.
 * entries with no value (e.g. an empty LinkedIn URL) are skipped, so levels stay consecutive.
 */
export const unlocks: Unlock[] = [
  profile.email && {
    id: "email",
    title: "Email address",
    label: profile.email,
    icon: IconType.EnvelopeIcon,
    href: `mailto:${profile.email}`,
    kind: "mailto",
  },
  cv && {
    id: "cv",
    title: "CV",
    label: "Download my CV",
    icon: IconType.DocumentArrowDownIcon,
    href: cv.href,
    kind: "download",
    download: cv.download,
  },
  profile.github && {
    id: "github",
    title: "GitHub",
    label: "See my code on GitHub",
    icon: IconTypeMUI.GitHub,
    href: profile.github,
    kind: "external",
  },
  profile.linkedin && {
    id: "linkedin",
    title: "LinkedIn",
    label: "Connect on LinkedIn",
    icon: IconTypeMUI.LinkedIn,
    href: profile.linkedin,
    kind: "external",
  },
  {
    id: "projects",
    title: "Projects",
    label: "Browse my projects",
    icon: IconType.Square3Stack3DIcon,
    href: projectsRoute,
    kind: "internal",
  },
].filter(Boolean) as Unlock[];
