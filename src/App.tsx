import { Routes, Route, Link } from "react-router-dom";
import AboutCard from "./components/About";
import ProjectCarousel from "./components/Cards";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-4 p-0">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AboutCard />
              <ProjectCarousel />
              <Experience />
            </>
          }
        />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      <div className="flex items-center w-md py-8">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-gray-300">end</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
    </div>
  );
}

export default App;
