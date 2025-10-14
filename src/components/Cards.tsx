import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";

import defaultVideo from "../imgs/videoplayback.mp4";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  video?: string;
  img?: string;
  github?: string;
  demo?: string;
  bg?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
  {
    id: 2,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
  {
    id: 3,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
  {
    id: 4,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
  {
    id: 5,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
  {
    id: 6,
    title: "Study Buddy",
    description: "AI-powered study assistant that organizes your notes.",
    tech: ["React", "TypeScript", "OpenAI API"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: defaultVideo,
    bg: "#f8f9fa",
  },
];

const ProjectCarousel: React.FC = () => {
  const totalProjects = projects.length;
  const dragFactor = 0.3;
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
              const minBrightness = 0.6;
              const maxBrightness = 1.0;
              return (
                minBrightness +
                ((zPos + radius) / (2 * radius)) *
                  (maxBrightness - minBrightness)
              );
            });

            const filter = useMotionTemplate`brightness(${brightnessValue})`;
            const isFront = useTransform(z, (zPos) => zPos > radius * 0.9);
            const videoRef = useRef<HTMLVideoElement>(null);

            const rotateY = useTransform(x, (xPos) => {
              const maxTilt = 30;
              let tilt = (xPos / radius) * maxTilt;
              if (xPos > 0) {
                const flipDist = Math.min(xPos / radius, 1);
                tilt += flipDist * 180;
              }
              return tilt;
            });

            useEffect(() => {
              const unsubscribe = isFront.onChange((front) => {
                if (videoRef.current) {
                  if (front) videoRef.current.play();
                  else videoRef.current.pause();
                }
              });

              const initialFront = (isFront.get && isFront.get()) || false;
              if (initialFront && videoRef.current) {
                videoRef.current.play();
              }

              return () => unsubscribe();
            }, [isFront]);

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
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm"
                    style={{
                      background: project.bg,
                      transform: "rotateY(0deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Video */}
                    {project.video && (
                    <video
                      ref={videoRef}
                      src={project.video}
                      loop
                      muted
                      playsInline
                      className="w-full rounded-lg mb-4"
                    />
                    )}
                    {/* Img */}
                    {project.img && (
                    <img
                      src={project.img}
                      className="w-full rounded-lg mb-4"
                    />
                    )}

                    {/* Title + GitHub/Demo */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-black font-bold text-2xl leading-tight">
                        {project.title}
                      </h2>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:scale-110 transition-all duration-200 ease-in-out"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="text-black"
                            >
                              <path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" />
                            </svg>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black hover:scale-110 transition-all duration-200 ease-in-out"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 640"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="text-black"
                            >
                              <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-black/90 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/30 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1.5 rounded-full border border-black-300/50 
             transition-all duration-200 ease-in-out 
             hover:bg-white/50 hover:scale-105 hover:shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-3xl flex items-center justify-center p-8 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
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
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
