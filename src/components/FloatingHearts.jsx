import { motion } from "framer-motion";

export default function FloatingHearts({ count = 20 }) {
  const items = Array.from({ length: count }, (_, i) => ({
    x: (i * 17 + 5) % 97,
    d: (i * 0.41) % 5,
    s: 14 + (i % 5) * 3,
    c: ["#f2a9bf", "#d9c9f2", "#ffd6c3", "#f7c9d8"][i % 4],
  }));

  return (
    <div className="floating-hearts" aria-hidden="true">
      {items.map((h, i) => (
        <motion.span
          key={i}
          style={{ left: `${h.x}%`, fontSize: h.s, color: h.c }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-15vh", opacity: [0, 0.7, 0], rotate: [-12, 12, -8] }}
          transition={{
            duration: 7 + (i % 5),
            delay: h.d,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? "♥" : "♡"}
        </motion.span>
      ))}
    </div>
  );
}
