import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, children }) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
    >
      <span>{eyebrow}</span>
      <h2>{children}</h2>
    </motion.div>
  );
}
