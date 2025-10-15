import { Canvas } from "@react-three/fiber";
import AboutCard from "./components/About";
import ProjectCarousel from "./components/Cards";
import Experience from "./components/Experience";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start gap-4 p-6">
      <AboutCard />
      <ProjectCarousel />
      <Experience />
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}></Canvas>
    </div>
  );
}

export default App;
