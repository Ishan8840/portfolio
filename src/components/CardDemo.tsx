import React, { useState } from "react";
import { motion } from "framer-motion";

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
    number: "4242 4242 4242 4242",
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

const maskNumber = (num: string) =>
  num
    .split(" ")
    .map((chunk, i, arr) => (i < arr.length - 1 ? "••••" : chunk))
    .join(" ");

const CardTest: React.FC = () => {
  const [cards] = useState<Card[]>(initialCards);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const nextCard = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) nextCard();
    else if (info.offset.x > 100) prevCard();
    setDragX(0);
  };

  const getTransform = (index: number) => {
    const total = cards.length;
    let offset = index - activeIndex;

    // Circular wrap
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const angle = (offset / total) * 360;
    const x = Math.sin((angle * Math.PI) / 180) * 300;
    const z = Math.cos((angle * Math.PI) / 180) * 200;
    const scale = 0.8 + 0.2 * Math.cos((angle * Math.PI) / 180);
    const opacity = 0.4 + 0.6 * Math.cos((angle * Math.PI) / 180);

    let rotateY = 0;
    if (index === activeIndex) {
      rotateY = 0;
    } else if (offset < 0) {
      rotateY = 0;
    } else {
      rotateY = 180;
    }

    return { x, z, scale, opacity, rotateY };
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-5xl [perspective:1500px]">
        <div className="relative h-[280px] flex items-center justify-center">
          {cards.map((card, index) => {
            const { x, z, scale, opacity, rotateY } = getTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={card.id}
                className="absolute w-[360px] h-[220px] cursor-grab"
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDrag={(e, info) => setDragX(info.offset.x)}
                onDragEnd={handleDragEnd}
                animate={{
                  x: x + (isActive ? dragX : 0),
                  z,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                style={{
                  zIndex: Math.round(scale * 100),
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-full h-full rounded-2xl shadow-2xl relative overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  {/* Card front */}
                  <div
                    className="absolute inset-0 rounded-2xl backface-hidden"
                    style={{
                      background: card.bg ?? "linear-gradient(135deg,#0ea5a6,#7c3aed)",
                      boxShadow: "inset 0 -8px 24px rgba(0,0,0,0.12)",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <div className="absolute top-4 right-4 text-white text-sm font-semibold opacity-95">
                      {card.brand}
                    </div>
                    <div className="absolute top-6 left-6 flex items-center gap-3">
                      <div className="w-10 h-8 rounded-sm [background:linear-gradient(90deg,#ffd27a,#c69b31)] shadow-sm" />
                      <div className="flex items-center gap-[2px]">
                        <div className="w-2 h-2 rounded-full bg-white/80" />
                        <div className="w-2 h-2 rounded-full bg-white/70" />
                        <div className="w-2 h-2 rounded-full bg-white/60" />
                      </div>
                    </div>
                    <div className="absolute left-6 bottom-16 text-white text-[20px] tracking-widest font-mono">
                      {maskNumber(card.number)}
                    </div>
                    <div className="absolute left-6 bottom-6 flex items-center gap-6 text-white">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-80">
                          Cardholder
                        </span>
                        <span className="text-sm font-semibold">{card.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-80">
                          Expires
                        </span>
                        <span className="text-sm font-semibold">{card.expiry}</span>
                      </div>
                    </div>
                  </div>
                  {/* Card back */}
                  <div
                    className="absolute inset-0 rounded-2xl backface-hidden"
                    style={{
                      background: "#333",
                      color: "#fff",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          Swipe cards left/right to navigate
        </div>
      </div>
    </div>
  );
};

export default CardTest;
