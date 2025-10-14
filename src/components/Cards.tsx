import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  bg?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/ishanshah/study-buddy",
    bg: "#f8f9fa",
  },
  {
    id: 2,
    title: "Flappy AI",
    description: "Self-playing Flappy Bird using reinforcement learning.",
    tech: ["Python", "PyTorch", "Gym"],
    github: "https://github.com/ishanshah/flappy-ai",
    bg: "#f8f9fa",
  },
  {
    id: 3,
    title: "Pneumonia Detector",
    description: "Medical image classifier detecting pneumonia from X-rays.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/ishanshah/pneumonia-detector",
    bg: "#f8f9fa",
  },
  {
    id: 4,
    title: "Pneumonia Detector",
    description: "Medical image classifier detecting pneumonia from X-rays.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/ishanshah/pneumonia-detector",
    bg: "#f8f9fa",
  },
  {
    id: 5,
    title: "Pneumonia Detector",
    description: "Medical image classifier detecting pneumonia from X-rays.",
    tech: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/ishanshah/pneumonia-detector",
    bg: "#f8f9fa",
  },
];

const ProjectCarousel: React.FC = () => {
  const totalProjects = projects.length;
  const dragFactor = 0.7;
  const rotation = useMotionValue(0);

  const handleDragEnd = () => {
    const anglePerCard = 360 / totalProjects;
    const nearestIndex = Math.round(rotation.get() / anglePerCard);
    const targetRotation = nearestIndex * anglePerCard;
    animate(rotation, targetRotation, {
      type: "spring",
      stiffness: 200,
      damping: 40,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-5xl [perspective:1500px]">
        <motion.div
          className="relative h-[300px] flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDrag={(_, info) =>
            rotation.set(rotation.get() + info.delta.x * dragFactor)
          }
          onDragEnd={handleDragEnd}
        >
          {projects.map((project, index) => {
            const anglePerCard = 360 / totalProjects;
            const baseAngle = index * anglePerCard;
            const angle = useTransform(
              rotation,
              (r) => ((r + baseAngle) * Math.PI) / 180
            );
            const radius = 170;

            const x = useTransform(angle, (a) => Math.sin(a) * radius);
            const z = useTransform(angle, (a) => Math.cos(a) * radius);
            const scale = useTransform(angle, (a) => 0.8 + 0.2 * Math.cos(a));
            const zIndex = useTransform(z, (zPos) => Math.round(zPos));

            const brightnessValue = useTransform(z, (zPos) => {
              const minBrightness = 0.3;
              const maxBrightness = 1.0;
              return (
                minBrightness +
                ((zPos + radius) / (2 * radius)) *
                  (maxBrightness - minBrightness)
              );
            });

            const filter = useMotionTemplate`brightness(${brightnessValue})`;

            const rotateY = useTransform(x, (xPos) => {
              const maxTilt = 30;
              let tilt = (xPos / radius) * maxTilt;
              if (xPos > 0) {
                const flipDist = Math.min(xPos / radius, 1);
                tilt += flipDist * 180;
              }
              return tilt;
            });

            return (
              <motion.div
                key={project.id}
                className="absolute w-[300px] h-[400px] cursor-grab"
                style={{
                  x,
                  z,
                  scale,
                  rotateY,
                  zIndex,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  filter,
                }}
              >
                <motion.div
                  className="w-full h-full rounded-3xl relative overflow-hidden"
                  style={{ 
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between backdrop-blur-sm"
                    style={{
                      background: project.bg,
                      transform: "rotateY(0deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div>
                      <h2 className="text-black font-bold text-2xl mb-3 leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-black/90 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-black/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md text-black px-5 py-2.5 rounded-xl font-medium hover:bg-black/30 transition-all pointer-events-auto border border-white/30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Github
                      </a>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-3xl flex items-center justify-center p-8 text-center"
                    style={{
                      background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-6">
                        {project.description}
                      </p>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-100 transition-all pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
