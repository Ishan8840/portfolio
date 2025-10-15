import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutCard() {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/ishan-shah-857975220/",
      iconSrc: "/imgs/linkedin.svg",
      label: "LinkedIn",
    },
    { href: "https://x.com/", iconSrc: "/imgs/x.svg", label: "Twitter" },
    {
      href: "https://github.com/Ishan8840",
      iconSrc: "/imgs/github.svg",
      label: "GitHub",
    },
    {
      href: "mailto:i9shah@uwaterloo.ca",
      iconSrc: "/imgs/email.svg",
      label: "Email",
    },
  ];

  const school = [
    { name: "University of Waterloo", logo: "imgs/uwaterloo.svg" },
  ];

  const name = "Ishan";
  const [hovered, setHovered] = useState(false);

  const frontImg = "imgs/headshot.png";
  const backImg = "imgs/drawing.png";
  const building = "Study Buddy";

  const spawnEmojiFromText = (emoji: string, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();

    const el = document.createElement("div");
    el.textContent = emoji;
    el.style.position = "fixed";
    el.style.left = `${rect.left}px`; // start at center of text
    el.style.top = `${rect.top + rect.height / 2}px`;
    el.style.fontSize = `${Math.random() * 24 + 16}px`;
    el.style.pointerEvents = "none";
    el.style.userSelect = "none";
    el.style.transition = "transform 2s ease-out, opacity 2s ease-out";

    document.body.appendChild(el);

    // Random direction and distance
    const angle = Math.random() * Math.PI * 2; // 0 to 360 degrees
    const distance = Math.random() * 150 + 100; // pixels
    const x = Math.cos(angle) * (distance - 100);
    const y = Math.abs(Math.sin(angle)) * distance;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${x}px, ${y}px) rotate(${
        Math.random() * 360
      }deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 1500);
  };

  const handleHover = (
    event: MouseEvent // native JS event
  ) => {
    const target = event.target as HTMLElement; // cast to HTMLElement
    for (let i = 0; i < 15; i++) {
      spawnEmojiFromText("👋", target);
    }
  };

  return (
    <motion.header
      className="flex flex-col items-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
    >
      {/* Profile Image */}
      <motion.div
        className="mb-4 mt-10 w-[100px] h-[100px] perspective-1000"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <motion.img
          src={hovered ? backImg : frontImg}
          alt="profile"
          className="w-full h-full rounded-full object-cover hover: cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: hovered ? 180 : 0,
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Greeting */}
      <motion.h1
        className="font-sans text-5xl mb-8 text-center cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.2 },
        }}
        onHoverStart={handleHover} // triggers confetti on hover
      >
        Hi, I&apos;m {name}.
      </motion.h1>

      {/* Intro Card */}
      <motion.div
        className="relative w-full max-w-xl  hover:scale-103 transition-all duration-200 ease-in-out cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, delay: 0.3 },
        }}
      >
        <div className="bg-card shadow-md rounded-lg p-6">
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-6">
            I study <span className="font-semibold text-gray-900">CS @</span>{" "}
            <span className="inline-flex items-centergap-1.5 align-middle">
              <span className="font-semibold text-gray-900">{school[0].name}</span>
            </span>{", "}
            where I explore my passion for{" "}
            <span className="text-gray-900 font-semibold">
              machine learning, agentic systems, and robotics
            </span>
            .
          </p>
          {/* Status and Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-[#94C040] mr-2"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm">
                <span className="hidden sm:inline">currently </span>building{" "}
                {building}
              </span>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={link.iconSrc}
                    alt={link.label}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:scale-110 transition-all duration-50 ease-in-out cursor-pointer"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
