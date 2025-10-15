import AboutCard from "./components/About";
import ProjectCarousel from "./components/Cards";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-4 p-6"
    >
      <AboutCard />
      <ProjectCarousel />
    </div>
  );
}

export default App;
