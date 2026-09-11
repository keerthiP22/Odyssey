import { motion } from "framer-motion";

export default function TownScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b1f3b] via-[#171d34] to-[#0b1020]" />

      {/* Moon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-20 top-16 h-20 w-20 rounded-full bg-yellow-200 shadow-[0_0_80px_rgba(255,230,120,.35)]"
      />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
          className="absolute h-[2px] w-[2px] rounded-full bg-white"
          style={{
            top: `${Math.random() * 45}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Mountain Glow */}
      <div className="absolute bottom-0 h-72 w-full bg-gradient-to-t from-[#08101d] to-transparent" />

      {/* Mountains */}
      <div
        className="absolute bottom-36 left-0 h-56 w-[140%]"
        style={{
          clipPath:
            "polygon(0% 100%,8% 55%,16% 80%,24% 35%,32% 70%,40% 30%,48% 82%,56% 45%,64% 74%,72% 36%,80% 72%,88% 52%,96% 85%,100% 100%)",
          background: "#162544",
          opacity: 0.65,
        }}
      />
    </div>
  );
}