import TabElement, { TabItems } from "../../molecules/Tab/TabElement.tsx";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle.ts";
import { profile } from "../../../data/profile.ts";
import { AboutMe } from "./TabItems/AboutMe/AboutMe.tsx";
import { Skills } from "./TabItems/Skills/Skills.tsx";
import { Experience } from "./TabItems/Experience/Experience.tsx";

const tabItems: TabItems[] = [
  { label: "About Me", selected: "about", tabItemElement: <AboutMe /> },
  { label: "Skills", selected: "skills", tabItemElement: <Skills /> },
  {
    label: "Experience",
    selected: "experience",
    tabItemElement: <Experience />,
  },
];

export default function HomePage() {
  useDocumentTitle();

  return (
    <div className="flex flex-col">
      <h1 className="sr-only">
        {profile.name} – {profile.title}
      </h1>
      <TabElement tabItems={tabItems} />
    </div>
  );
}
