import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type Job = {
  id: number;
  title: string;
  date: string;
  description: string;
  bullets: string[];
  img: string;
  tech: string[];
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Software Engineer Intern @ IPMD",
    date: "July 2025 - Sept 2025, San Mateo, CA",
    description:
      "changing the way businesses and healthcare providers harness the power of facial and emotional AI.",
    bullets: [
      "Replaced custom auth logic with Flask-JWT-Extended, centralizing token management across 10 endpoints and resolving registration edge cases.",
      "Modularized frontend by extracting 5+ reusable components, reducing code duplication by 30% and accelerating future feature development.",
      "Built a React chat interface integrated with an AI emotion analysis endpoint, enabling real-time sentiment visualization and smoother user interaction in demo interactions.",
    ],
    img: "imgs/ipmd.jpeg",
    tech: ["Python", "Flask", "React"],
  },
  {
    id: 2,
    title: "Innovator @ The Knowledge Society",
    date: "Sept 2021 - Jun 2022, Toronto, ON",
    description: "global innovation program",
    bullets: [
      "Built and deployed CNN models for image classification (e.g., rock-paper-scissors), achieving 92% accuracy and validating models on multiple datasets.",
      "Partnered with Walmart to analyze supply chain challenges and identify optimization strategies, delivering a presentation with actionable solutions for inventory and logistics improvements",
      "Developed prototypes in hackathons using computer vision and NLP, including a drowning detector, enhancing skills in quick ML deployment.",
    ],
    img: "imgs/tks.jpg",
    tech: ["Python", "Tensorflow"],
  },
];

const Experience: React.FC = () => {
  const [visibleBullets, setVisibleBullets] = useState<number[]>([]);

  const toggleBullets = (id: number) => {
    setVisibleBullets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      className="relative w-full max-w-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-12 sm:mb-8">
        <motion.h1
          className="text-left text-xl sm:text-2xl md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        >
          Where I've been.
        </motion.h1>

        <a
          href="imgs/resume.pdf"
          target="_blank"
          className="text-sm sm:text-base hover:text-blue-600 transition-colors"
        >
          Resume →
        </a>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-xl flex flex-col gap-1">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col sm:flex-row gap-2 p-2 bg-white hover:scale-101 transition-all duration-200 ease-in-out"
            >
              <img
                src={job.img}
                alt={job.title}
                className="w-full max-w-10 max-h-10 object-cover rounded-lg"
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 whitespace-nowrap overflow-hidden">
                  {job.title}
                  <span className="text-xs text-gray-500 font-extralight">
                    ({job.date})
                  </span>

                  {visibleBullets.includes(job.id) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-4 h-4 text-gray-500 ml-9 hover:cursor-pointer hover:scale-110 transition-all duration-200"
                      onClick={() => toggleBullets(job.id)}
                    >
                      <path d="M503.5 71C512.9 61.6 528.1 61.6 537.4 71L569.4 103C578.8 112.4 578.8 127.6 569.4 136.9L482.4 223.9L521.4 262.9C528.3 269.8 530.3 280.1 526.6 289.1C522.9 298.1 514.2 304 504.5 304L360.5 304C347.2 304 336.5 293.3 336.5 280L336.5 136C336.5 126.3 342.3 117.5 351.3 113.8C360.3 110.1 370.6 112.1 377.5 119L416.5 158L503.5 71zM136.5 336L280.5 336C293.8 336 304.5 346.7 304.5 360L304.5 504C304.5 513.7 298.7 522.5 289.7 526.2C280.7 529.9 270.4 527.9 263.5 521L224.5 482L137.5 569C128.1 578.4 112.9 578.4 103.6 569L71.6 537C62.2 527.6 62.2 512.4 71.6 503.1L158.6 416.1L119.6 377.1C112.7 370.2 110.7 359.9 114.4 350.9C118.1 341.9 126.8 336 136.5 336z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-4 h-4 text-gray-500 ml-9 hover:cursor-pointer hover:scale-110 transition-all duration-200"
                      onClick={() => toggleBullets(job.id)}
                    >
                      <path d="M408 64L552 64C565.3 64 576 74.7 576 88L576 232C576 241.7 570.2 250.5 561.2 254.2C552.2 257.9 541.9 255.9 535 249L496 210L409 297C399.6 306.4 384.4 306.4 375.1 297L343.1 265C333.7 255.6 333.7 240.4 343.1 231.1L430.1 144.1L391.1 105.1C384.2 98.2 382.2 87.9 385.9 78.9C389.6 69.9 398.3 64 408 64zM232 576L88 576C74.7 576 64 565.3 64 552L64 408C64 398.3 69.8 389.5 78.8 385.8C87.8 382.1 98.1 384.2 105 391L144 430L231 343C240.4 333.6 255.6 333.6 264.9 343L296.9 375C306.3 384.4 306.3 399.6 296.9 408.9L209.9 495.9L248.9 534.9C255.8 541.8 257.8 552.1 254.1 561.1C250.4 570.1 241.7 576 232 576z" />
                    </svg>
                  )}
                </h2>
                <div className="flex flex-wrap gap-0.5">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-white/30 backdrop-blur-sm text-gray-800 text-xs sm:text-sm font-extralight px-2 py-0.2 rounded-full border border-black/20 hover:bg-white/50 hover:scale-105 hover:border-black/50 hover:cursor-pointer transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {visibleBullets.includes(job.id) ? (
                    <motion.ul
                      key="bullets"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="list-disc list-outside text-gray-600 space-y-1 text-sm mt-3 ml-5 max-w-md"
                    >
                      {job.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.p
                      key="description"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-gray-700 mt-2 mb-2 max-w-md"
                    >
                      {job.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
