import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme.ts";
import { StaticRoutes } from "./routing/routing.tsx";

// HashRouter keeps deep links (/#/projects) working on GitHub Pages, which
// can't serve client-side routes, without needing a 404.html redirect.
function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <StaticRoutes />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
