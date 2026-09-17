import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Menu from "@mui/material/Menu";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconTypeMUI } from "../../atoms/Icon/icon.ts";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IconButtonElement } from "../../atoms/Button/IconButton/IconButton.tsx";

const pages = ["GitHub", "LinkedIn", "Download CV"];

export function NavBarElement() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  return (
    <AppBar position="relative" className="!shadow-none" color="transparent">
      <Container maxWidth="xl" className="">
        <Toolbar disableGutters className="flex flex-row">
          {/* Large Screens - title */}
          <div className="flex-1 hidden md:flex">
            <AdbIcon />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#home"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Projects
            </Typography>
          </div>
          {/* Small Screens - title */}

          <div className="flex-1 flex md:hidden">
            <AdbIcon />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Projects
            </Typography>
          </div>
          <div className="hidden md:flex flex-row">
            <IconButtonElement
              tooltipTitle="GitHub"
              icon={<Icon iconName={IconTypeMUI.GitHub} />}
            />
            <IconButtonElement
              tooltipTitle="LinkedIn"
              icon={<Icon iconName={IconTypeMUI.LinkedIn} />}
            />
            <IconButtonElement
              tooltipTitle="Download CV"
              icon={<Icon iconName={IconTypeMUI.FileDownloadOutlined} />}
            />
          </div>
          <Box className="flex flex-grow md:hidden justify-end ">
            <IconButtonElement
              onClick={handleOpenNavMenu}
              icon={<Icon iconName={IconTypeMUI.MenuOutlined} />}
            />
            <Menu
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block md:hidden mt-2"
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  className="p-2 m-4"
                >
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
