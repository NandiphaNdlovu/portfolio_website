import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { Icon } from "../../atoms/Icon/Icon.tsx";
// import { IconTypeMUI } from "../../atoms/Icon/icon.ts";
// import { IconButtonElement } from "../../atoms/Button/IconButton/IconButton.tsx";

export function FooterElement() {
  return (
    <AppBar position="relative" className="!shadow-none" color="transparent">
      <Container maxWidth="xl" className="">
        <Toolbar disableGutters className="flex flex-row">
          {/* TODO: make label component */}
          <div className="flex-1 md:flex w-60">
            <Typography
              variant="caption"
              noWrap
              component="p"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              © 2023 Nandipha Ndlovu. All Rights Reserved. Remember, just like
              potatoes, creativity here is meant to be enjoyed, not mashed
              without permission!
            </Typography>
          </div>

          {/* TODO: make socials component */}

          {/* <div className="hidden md:flex flex-row">
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
          </div> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
