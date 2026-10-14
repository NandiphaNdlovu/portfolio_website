import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { profile } from "../../../data/profile.ts";

export function FooterElement() {
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="py-2">
          <Typography
            variant="caption"
            component="p"
            sx={{ fontFamily: "monospace", color: "inherit" }}
          >
            © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
            Remember, just like potatoes, creativity here is meant to be
            enjoyed, not mashed without permission!
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
