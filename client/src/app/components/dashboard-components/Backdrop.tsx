import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50 backdrop-blur-md"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
