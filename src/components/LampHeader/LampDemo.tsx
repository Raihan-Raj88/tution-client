"use client";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import "../../App.css";

export function LampDemo() {
  return (
    <div className="bg-slate-950">
      <LampContainer className="pt-28 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="secondary-font mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          NOW GETTING THE RIGHT{" "}
          <span className="lg:block">TEACHER IS TOO EASY</span>
        </motion.h1>
      </LampContainer>
    </div>
  );
}
