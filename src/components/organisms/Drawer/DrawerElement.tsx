import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import { profile } from "../../../data/profile.ts";
import { gameRoute, homeRoute, projectsRoute } from "../../../routing/routes.ts";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  /** Internal route, rendered as a router link (highlighted when active). */
  to: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <Icon iconName={IconType.HomeIcon} />,
    to: homeRoute,
  },
  {
    label: "Projects",
    icon: <Icon iconName={IconType.Square3Stack3DIcon} />,
    to: projectsRoute,
  },
  {
    label: "Game",
    icon: <Icon iconName={IconType.PuzzlePieceIcon} />,
    to: gameRoute,
  },
];

const COLLAPSED_WIDTH = 64;
const EXPANDED_WIDTH = 224;

function DrawerLinks({
  items,
  open,
}: {
  items: NavItem[];
  open: boolean;
}) {
  return (
    <List className="flex flex-col justify-center p-2 md:block">
      {items.map((item) => (
        <ListItem
          key={item.label}
          disablePadding
          className="mb-2 flex items-center justify-center"
        >
          <Tooltip title={!open ? item.label : ""} placement="right">
            <ListItemButton
              component={NavLink}
              to={item.to}
              end
              aria-label={item.label}
              className={`flex h-8 items-center justify-center rounded-lg px-3 py-3 [&.active]:bg-accent/20 [&.active]:text-accent-strong`}
            >
              <span
                className={`flex shrink-0 items-center justify-center ${open ? "mr-3" : ""}`}
              >
                {item.icon}
              </span>

              {open && <span className="whitespace-nowrap">{item.label}</span>}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
}

export function SideDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const width = open ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <aside
      className="sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden transition-[width] duration-300 ease-in-out"
      style={{ width }}
    >
      <Drawer
        variant="permanent"
        open={open}
        className="flex shrink-0 items-center justify-center"
        slotProps={{
          paper: {
            sx: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              overflow: "hidden",
              width,
              transition: "width 300ms ease-in-out",
            },
          },
        }}
      >
        <div className="mx-2 flex h-16 flex-row items-center justify-end border-b px-2">
          {open && (
            <div className="flex flex-1 items-center justify-center gap-4">
              <Icon
                iconName={IconTypeMUI.Diversity2Outlined}
                className="m-4 flex justify-start"
              />
              <span className="flex flex-1 flex-col">
                <Typography
                  variant="subtitle1"
                  noWrap
                  component={Link}
                  to={homeRoute}
                  sx={{
                    mr: 2,
                    fontFamily: "math",
                    fontWeight: 100,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {profile.title}
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  component={Link}
                  to={homeRoute}
                  sx={{
                    mr: 2,
                    flexGrow: 1,
                    fontFamily: "math",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {profile.name}
                </Typography>
              </span>
            </div>
          )}
          <IconButtonElement
            ariaLabel={open ? "Collapse sidebar" : "Expand sidebar"}
            onClick={toggleDrawer}
            icon={
              <Icon
                iconName={
                  open
                    ? IconType.ChevronDoubleLeftIcon
                    : IconType.ChevronDoubleRightIcon
                }
              />
            }
          />
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col p-2 md:block">
          <DrawerLinks items={navItems} open={open} />
        </nav>
      </Drawer>
    </aside>
  );
}
