import type { ITimelineItems } from "../components/atoms/Timeline/TimelineElement.tsx";

export const experience: ITimelineItems[] = [
  {
    title: "Software Engineer",
    date: "Jan 2025 – Present",
    subtext: "Altron Healthtech | Woodmead, Sandton",
    current: true,
  },
  {
    title: "Graduate Software Developer",
    date: "Jan 2024 – Jan 2025",
    subtext: "Altron Healthtech | Woodmead, Sandton",
  },
  {
    title: "Peer Tutor",
    date: "Mar 2022 – Nov 2023",
    subtext: "Belgium Campus ITVersity | Pretoria",
  },
  {
    title: "Volunteer Database Assistant",
    date: "Jan 2020 – Nov 2021",
    subtext: "DataBox | White River",
  },
];

export interface EducationItem {
  title: string;
  institution: string;
  date: string;
}

export const education: EducationItem[] = [
  {
    title: "BCompSc Computer Science (NQF Level 8)",
    institution: "Belgium Campus ITVersity",
    date: "Mar 2021 – May 2025",
  },
  {
    title: "High School",
    institution: "Lowveld High School",
    date: "Jan 2015 – Dec 2019",
  },
];
