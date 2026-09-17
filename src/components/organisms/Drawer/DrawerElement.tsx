import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconType, IconTypeMUI } from "../../atoms/Icon/icon.ts";
import { IconButtonElement } from "../../atoms/Button/IconButton/IconButton.tsx";

interface NavItem {
  label?: string;
  icon: React.ReactNode;
  href?: string | null | undefined;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <Icon iconName={IconType.HomeIcon} />,
    href: "/",
  },
  {
    label: "Projects",
    icon: <Icon iconName={IconType.Square3Stack3DIcon} />,
    href: "projects",
  },
];

const confItems: NavItem[] = [
  {
    label: "Settings",
    icon: <Icon iconName={IconType.Cog6ToothIcon} />,
    href: "/",
  },
  {
    label: "Let's Talk",
    icon: <Icon iconName={IconType.PaperAirplaneIcon} />,
    href: "/",
  },
];

export function SideDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <aside
      className={`relative flex h-screen shrink-0 flex-col overflow-hidden transition-[width] duration-300 ease-in-out ${open ? "w-56" : "w-16"}`}
    >
      <Drawer
        variant="permanent"
        open={open}
        className="shrink-0 flex justify-center items-center"
        slotProps={{
          paper: {
            className: `relative !bg-transparent flex flex-col h-screen overflow-hidden transition-[width] duration-300 ease-in-out ${open ? "w-56" : "w-16"}`,
          },
        }}
      >
        <div className="flex flex-row h-16 items-center justify-end border-b px-2 mx-2">
          {open ? (
            <div className="flex-1 flex gap-4 justify-center items-center">
              <Icon
                iconName={IconTypeMUI.Diversity2Outlined}
                className="flex justify-start m-4"
              />
              <span className="flex-1 flex flex-col">
                <Typography
                  variant="subtitle1"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    fontFamily: "math",
                    fontWeight: 100,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Software Developer
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                    fontFamily: "math",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Nandipha Ndlovu
                </Typography>
              </span>
            </div>
          ) : (
            <></>
          )}
          {open ? (
            <IconButtonElement
              onClick={toggleDrawer}
              icon={<Icon iconName={IconType.ChevronDoubleLeftIcon} />}
            />
          ) : (
            <IconButtonElement
              onClick={toggleDrawer}
              icon={<Icon iconName={IconType.ChevronDoubleRightIcon} />}
            />
          )}
        </div>

        <div className="flex flex-1 p-2 flex-col md:block">
          <List className="p-2 flex flex-col justify-center md:block">
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                className="flex justify-center items-center mb-2"
              >
                <Tooltip
                  key={item.label}
                  title={!open ? item.label : ""}
                  placement="right"
                >
                  <ListItemButton
                    key={item.label}
                    href={item.href ?? "/"}
                    onClick={(event) => {
                      event.stopPropagation();

                      // navigation here
                    }}
                    className={`flex h-8 justify-center items-center rounded-lg px-3 py-3 hover:bg-gray-100 `}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center ${open ? "mr-3" : ""}`}
                    >
                      {item.icon}
                    </span>

                    {open && (
                      <span className="whitespace-nowrap">{item.label}</span>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </div>

        <div className="flex border-t p-2 flex-col justify-center md:block">
          <List className="p-2 flex flex-col justify-center md:block">
            {confItems.map((item) => (
              <ListItem
                key={item.label}
                disablePadding
                className="flex justify-center items-center mb-2"
              >
                <Tooltip title={!open ? item.label : ""} placement="right">
                  <ListItemButton
                    className={`flex h-8 justify-center items-center rounded-lg px-3 py-3 border `}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    key={item.label}
                    href={item.href ?? "/"}
                    onClick={(event) => {
                      event.stopPropagation();

                      // navigation here
                    }}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center ${open ? "mr-3" : ""}`}
                    >
                      {item.icon}
                    </span>

                    {open && (
                      <span className="whitespace-nowrap">{item.label}</span>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </aside>
  );
}
