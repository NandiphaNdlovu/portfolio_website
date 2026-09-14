import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { StaticRoutes } from "./routing/routing.tsx";

function App() {
  return (
    <BrowserRouter>
      <StaticRoutes />
    </BrowserRouter>
  );
}

export default App;
