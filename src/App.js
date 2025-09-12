import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { Skills } from "./components/Skills";
import { HistoryTimeline } from "./components/HistoryTimeline/HistoryTimeline";
import Particles from "./components/Particles";

function App() {
  return (
    <div className="App">
      <Particles />
      <NavBar />
      <Banner />
      <Skills />
      <HistoryTimeline />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
