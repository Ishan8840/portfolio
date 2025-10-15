declare module "canvas-confetti" {
  interface ConfettiParticle {
    emoji?: string;
    emojiSize?: number;
  }

  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    ticks?: number;
    gravity?: number;
    drift?: number;
    emojis?: string[];
    emojiSize?: number;
    drawShape?: (ctx: CanvasRenderingContext2D, particle: ConfettiParticle) => void;
    useWorker?: boolean;
  }

  function confetti(options?: ConfettiOptions): void;
  export default confetti;
}
