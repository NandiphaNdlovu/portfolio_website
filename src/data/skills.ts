import { IconTypeMUI } from "../components/atoms/Icon/icon.ts";

export interface SkillArea {
  title: string;
  subheader: string;
  body: string;
  icon: IconTypeMUI;
}

export const skillAreas: SkillArea[] = [
  {
    icon: IconTypeMUI.Code,
    title: "Software Development",
    subheader: "Turning ideas into working software",
    body: "Design, build, test, and maintain applications that solve real-world problems.",
  },
  {
    icon: IconTypeMUI.Psychology,
    title: "Problem Solving",
    subheader: "Finding better ways to solve problems",
    body: "Analyze requirements, investigate issues, debug code, and develop effective solutions.",
  },
  {
    icon: IconTypeMUI.Web,
    title: "Frontend Development",
    subheader: "Building intuitive user experiences",
    body: "Create responsive and accessible interfaces using React, TypeScript, and modern UI technologies.",
  },
  {
    icon: IconTypeMUI.Storage,
    title: "Backend Development",
    subheader: "Making applications work behind the scenes",
    body: "Build APIs, services, and data-driven systems that are reliable, scalable, and maintainable.",
  },
  {
    icon: IconTypeMUI.DataObject,
    title: "Database Development",
    subheader: "Working with data",
    body: "Design, query, and maintain databases while ensuring data is structured, accessible, and reliable.",
  },
  {
    icon: IconTypeMUI.BugReport,
    title: "Testing & Debugging",
    subheader: "Making sure things work",
    body: "Identify bugs, investigate root causes, test solutions, and improve application stability.",
  },
  {
    icon: IconTypeMUI.CloudUpload,
    title: "Cloud & Deployment",
    subheader: "Getting software into the real world",
    body: "Work with cloud services, containers, and CI/CD pipelines to build and deploy applications efficiently.",
  },
  {
    icon: IconTypeMUI.Groups,
    title: "Collaboration",
    subheader: "Building software as a team",
    body: "Work with developers, testers, stakeholders, and users to understand requirements and deliver effective solutions.",
  },
  {
    icon: IconTypeMUI.School,
    title: "Continuous Learning",
    subheader: "Always improving",
    body: "Learn new technologies, explore better development practices, and continuously improve technical skills.",
  },
  {
    icon: IconTypeMUI.AutoAwesome,
    title: "AI Integration",
    subheader: "Exploring what's next",
    body: "Explore ways to integrate AI and intelligent agents into applications to improve functionality and user experiences.",
  },
];

/** Tools and technologies, taken from the CV. */
export const techStack: string[] = [
  "C#",
  ".NET Framework",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Node.js",
  "Tailwind CSS",
  "REST APIs",
  "MS SQL Server",
  "Delphi",
  "Figma",
  "UX/UI Design",
];
