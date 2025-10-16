import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

type Build = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  video?: string;
  img?: string;
  github?: string;
  demo?: string;
};

const projects: Build[] = [
  {
    id: 1,
    title: "Study Buddy",
    description:
      "Gamified AI study habit tracker using MediaPipe for real-time detection to monitor focus, distractions, and face-touching",
    tech: ["React", "JavaScript", "FastAPI", "MediaPipe", "Redis", "MongoDB"],
    github: "https://github.com/Ishan8840/StudyBuddy",
    demo: "https://www.studybene.fit/",
    video: "/imgs/studybuddy.mp4",
  },
  {
    id: 2,
    title: "Flixit",
    description:
      "A polished frontend for a movie rental experience. Navigate movies, view info, and enjoy intuitive design elements.",
    tech: ["React", "Firebase", "JavaScript"],
    github: "https://github.com/Ishan8840/movie-rental-app",
    demo: "https://react-tmdb-api-movie-website.vercel.app/",
    video: "/imgs/movierental.mp4",
  },
  {
    id: 3,
    title: "Hack Mate",
    description:
      "A Tinder-style project discovery app for hackers and makers. Swipe right to show interest, left to pass.",
    tech: ["React", "TypeScript", "Supabase"],
    github: "https://github.com/Ishan8840/HackMate",
    video: "/imgs/hackmate.mp4",
  },
  {
    id: 4,
    title: "SocialSphere API",
    description: "A backend social media platform built with FastAPI.",
    tech: ["FastAPI", "PostgreSQL", "Docker"],
    github: "https://github.com/Ishan8840/social-media-backend",
    video: "/imgs/socialmedia.mp4",
  },
  {
    id: 5,
    title: "LearnAI",
    description:
      "Chrome extension that uses Google's Gemini API to help users navigate websites with natural language prompts",
    tech: ["JavaScript", "Gemini", "Extensions"],
    github: "https://github.com/Ishan8840/learn-ai",
    video: "/imgs/learnai.mp4",
  },
  {
    id: 6,
    title: "OperAid",
    description:
      "Voice-controlled platform that eliminates the need for manual record searching.",
    tech: ["Next.js", "FastAPI", "OpenAI", "ElevenLabs", "Supabase"],
    github: "https://github.com/Ishan8840/OperAId",
    demo: "https://operaid.framer.website/",
    video: "/imgs/operaid.mp4",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.1, // smoother, simple fade + slide
      ease: "linear",
    },
  },
};


const Projects: React.FC = () => {
  const navigate = useNavigate();

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play();
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="bg-white pt-13 px-4 max-w-6xl mx-auto relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 shadow-sm border border-gray-300 rounded-md hover:shadow-md hover:scale-105 cursor-pointer transition"
        title="Back to Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <h2 className="text-4xl text-center mb-13">Projects</h2>

      <motion.div
        className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-102 transition-transform duration-300 cursor-pointer"
            variants={cardVariants}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            {project.video ? (
              <video
                src={project.video}
                loop
                muted
                className="w-full h-48 object-cover"
              />
            ) : project.img ? (
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            ) : null}

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:scale-110 transition-transform duration-200"
                      title="GitHub"
                    >
                      {/* GitHub Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72z" />
                      </svg>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:scale-110 transition-transform duration-200"
                      title="Live Demo"
                    >
                      {/* Demo Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
