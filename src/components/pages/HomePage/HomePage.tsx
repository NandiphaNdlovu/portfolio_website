import TabElement, { TabItems } from "../../molecules/Tab/TabElement.tsx";
import { AboutMe } from "./TabItems/AboutMe/AboutMe.tsx";
import { Skills } from "./TabItems/Skills/Skills.tsx";

export function HomePage() {
  const tabItems: TabItems[] = [
    { label: "About Me", selected: "about", tabItemElement: <AboutMe /> },
    { label: "Skills", selected: "skills", tabItemElement: <Skills/>},
  ];
  return (
    <div className="flex flex-col h-full">
      <TabElement tabItems={tabItems} />
    </div>
  );
}
