import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { Icon } from "../../atoms/Icon/Icon.tsx";
import { IconTypeMUI } from "../../atoms/Icon/icon.ts";
import { IconButtonElement } from "../../atoms/Button/IconButton/IconButton.tsx";
import { profile, profileLinks } from "../../../data/profile.ts";

export function NavBarElement() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex flex-row">
          {/* Site title (home link) */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Icon iconName={IconTypeMUI.Code} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                letterSpacing: { xs: ".05rem", sm: ".2rem" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {profile.name}
            </Typography>
          </div>

          {/* Large screens - links */}
          <div className="hidden flex-row md:flex">
            {profileLinks.map((link) => (
              <IconButtonElement
                key={link.label}
                tooltipTitle={link.label}
                href={link.href}
                external={link.external}
                download={link.download}
                icon={<Icon iconName={link.icon} />}
              />
            ))}
          </div>

          {/* Small screens - menu */}
          <Box className="flex flex-grow justify-end md:hidden">
            <IconButtonElement
              ariaLabel="Open menu"
              onClick={handleOpenNavMenu}
              icon={<Icon iconName={IconTypeMUI.MenuOutlined} />}
            />
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="mt-2 block md:hidden"
            >
              {profileLinks.map((link) => (
                <MenuItem
                  key={link.label}
                  component="a"
                  href={link.href}
                  download={link.download}
                  {...(link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {link.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
