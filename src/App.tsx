import AboutCard from "./components/About";
import ProjectCarousel from "./components/Cards";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-4 p-6"
    >
      <AboutCard />
      <ProjectCarousel />
      <Experience />
      <div className="min-h-50"></div>
    </div>
  );
}

export default App;
