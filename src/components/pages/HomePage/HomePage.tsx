import { IconButton } from "@mui/material";
import { CardElement, CardItem } from "../../atoms/Card/CardElement.tsx";
import { IconType, IconTypeMUI } from "../../atoms/Icon/icon.ts";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import TimelineElement, {
  ITimelineItems,
} from "../../atoms/Timeline/TimelineElement.tsx";
import { SteppersElement } from "../../organisms/Stepper/StepperElement.tsx";

const body = `This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.`;

const timelineItems: ITimelineItems[] = [
  {
    title: "Software Engineer",
    date: "01/2025 to Current",
    subtext: "Altron Healthtech | Woodmead, Sandton",
    current: true,
  },
  {
    title: "Graduate Software Developer",
    date: "01/2024 to 01/2025",
    subtext: "Altron Healthtech | Woodmead, Sandton",
  },
  {
    title: "Peer Tutor",
    date: "03/2022 to 11/2023",
    subtext: "Belgium Campus ItVersity | Pretoria",
  },
  {
    title: "Volunteer Database Assistant",
    date: "01/2020 to 11/2021",
    subtext: "DataBox | White River",
  },
];

const cardItems: CardItem[] = [
  {
    title: "About Me",
    subheader: "",
    body: `Software development professional with a track record of producing reliable code and
contributing to project success. Known for collaborative teamwork and result driven approach
in dynamic environments. Skilled programming languages and adept at communicating
technical concepts`,
    avatar: <Icon iconName={IconType.UserCircleIcon} />,
    action: (
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => {}}
        color="inherit"
      >
        <Icon iconName={IconTypeMUI.FileDownloadOutlined} />
      </IconButton>
    ),
  },
  { title: "My Esperance" },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2">
        {cardItems.map((item) => (
          <CardElement
            title={item.title}
            subheader={item.subheader}
            body={item.body}
            action={item.action}
            avatar={item.avatar}
            key={item.title}
          />
        ))}
        {/* <CardElement title={"title"} subheader={"subheader"} body={body} />
        <CardElement title={"title"} subheader={"subheader"} body={body} /> */}
      </div>
      <TimelineElement timelineItems={timelineItems} />
      {/* <SteppersElement /> */}
    </div>
  );
}
