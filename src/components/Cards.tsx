import React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
} from "framer-motion";

type Card = {
  id: number;
  number: string;
  name: string;
  expiry: string;
  brand?: string;
  bg?: string;
};

const initialCards: Card[] = [
  {
    id: 1,
    number: "Study Buddy",
    name: "ISHAN SHAH",
    expiry: "08/28",
    brand: "VISA",
    bg: "linear-gradient(135deg,#0ea5a6,#7c3aed)",
  },
  {
    id: 2,
    number: "1234 5678 9012 3456",
    name: "ALEX DOE",
    expiry: "11/26",
    brand: "Mastercard",
    bg: "linear-gradient(135deg,#ef4444,#f97316)",
  },
  {
    id: 3,
    number: "9876 5432 1098 7654",
    name: "SAM SMITH",
    expiry: "04/27",
    brand: "AMEX",
    bg: "linear-gradient(135deg,#2563eb,#06b6d4)",
  },
  {
    id: 4,
    number: "1111 2222 3333 4444",
    name: "JANE DOE",
    expiry: "09/25",
    brand: "VISA",
    bg: "linear-gradient(135deg,#f43f5e,#ec4899)",
  },
  {
    id: 5,
    number: "5555 6666 7777 8888",
    name: "JOHN DOE",
    expiry: "01/29",
    brand: "Mastercard",
    bg: "linear-gradient(135deg,#fbbf24,#f97316)",
  },
];


const CardCarousel: React.FC = () => {
  const cards = initialCards;
  const totalCards = cards.length;
  const dragFactor = 0.3;
  const rotation = useMotionValue(0);

  const handleDragEnd = () => {
    const anglePerCard = 360 / totalCards;
    const nearestIndex = Math.round(rotation.get() / anglePerCard);
    const targetRotation = nearestIndex * anglePerCard;
    animate(rotation, targetRotation, {
      type: "spring",
      stiffness: 90,
      damping: 20,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-5xl [perspective:1500px]">
        <motion.div
          className="relative h-[280px] flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDrag={(_, info) =>
            rotation.set(rotation.get() + info.delta.x * dragFactor)
          }
          onDragEnd={handleDragEnd}
        >
          {cards.map((card, index) => {
            const anglePerCard = 360 / totalCards;
            const baseAngle = index * anglePerCard;
            const angle = useTransform(
              rotation,
              (r) => ((r + baseAngle) * Math.PI) / 180
            );
            const radius = 170;

            const x = useTransform(angle, (a) => Math.sin(a) * radius);
            const z = useTransform(angle, (a) => Math.cos(a) * radius);
            const scale = useTransform(angle, (a) => 0.8 + 0.2 * Math.cos(a));
            const opacity = 1;
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
                key={card.id}
                className="absolute w-[300px] h-[400px] cursor-grab"
                style={{
                  x,
                  z,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  filter,
                }}
              >
                <motion.div
                  className="w-full h-full rounded-2xl shadow-2xl relative overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-2xl backface-hidden"
                    style={{ background: card.bg, transform: "rotateY(0deg)" }}
                  >
                    <div className="absolute top-4 right-4 text-white text-sm font-semibold opacity-95">
                      {card.brand}
                    </div>
                    <div className="absolute left-6 bottom-16 text-white text-[20px] tracking-widest font-mono">
                      {card.number}
                    </div>
                    <div className="absolute left-6 bottom-6 flex items-center gap-6 text-white">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-80">
                          Cardholder
                        </span>
                        <span className="text-sm font-semibold">
                          {card.name}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-80">
                          Expires
                        </span>
                        <span className="text-sm font-semibold">
                          {card.expiry}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl backface-hidden flex items-center justify-center"
                    style={{
                      background: "#333",
                      color: "#fff",
                      transform: "rotateY(180deg)",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Card Back
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

export default CardCarousel;
