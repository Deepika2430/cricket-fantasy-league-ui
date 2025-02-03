import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const BatsmanAnimation: React.FC = () => {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-800">
      <AnimatePresence>
        {!showForm && (
          <>
            {/* Image of Batsman */}
            <motion.img
              src="src\data\cricket-player-ready-to-hit.png" // Replace with the actual image URL
              alt="Batsman"
              initial={{ x: -100, y: 50, scale: 0.8 }}
              animate={{
                rotate: [-10, 45, -10],
                transition: {
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  repeat: 0,
                },
              }}
              className="absolute left-1/4 bottom-1/3 w-64 h-64"
            />

            {/* Ball */}
            <motion.div
              initial={{ x: -80, y: 100 }}
              variants={{
                initial: { x: -80, y: 100 },
                animate1: {
                  x: 150,
                  y: 80,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
                animate2: {
                  x: 400,
                  y: -150,
                  scale: 0.8,
                  transition: { duration: 0.5 },
                },
                animate3: {
                  x: 600,
                  y: 100,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.5,
                  },
                },
              }}
              animate={["animate1", "animate2", "animate3"]}
              className="w-8 h-8 rounded-full bg-red-500 absolute"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
              }}
            />

            {/* "SIX!" Text Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 300, y: -100 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.5, 0],
                transition: {
                  duration: 2,
                  times: [0, 0.2, 0.8, 1],
                  delay: 1,
                },
              }}
              className="absolute text-6xl font-bold text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              SIX!
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatsmanAnimation;