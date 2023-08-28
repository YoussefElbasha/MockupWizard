"use client";
import toast from "react-hot-toast";
import ImageCard from "../components/dalle-components/imagecard";
import TextInput from "../components/dalle-components/TextInput";
import { motion } from "framer-motion";
const page = () => {
  const handleResubmission = async () => {
    try {
    } catch (errors) {
      toast.error("somethingWentWrong");
    }
  };

  return (
    <div className="bg-[#14162E] m-auto min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ top: "21%", left: "6%", x: "0%", y: "0%", opacity: 1 }}
        animate={{ top: "20%", left: "36%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-[#DDA82A] rounded-full blur-3xl opacity-50" />
      </motion.div>
      <motion.div
        initial={{ top: "57%", left: "13%", x: "0%", y: "0%", opacity: 1 }}
        animate={{ top: "57%", left: "47%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-[#4461F2] rounded-full blur-3xl opacity-50" />
      </motion.div>
      <TextInput onSubmit={() => {}} />
      <ImageCard imageUrl="https://tinyurl.com/2txk9mmc" onClick={() => {}} />
    </div>
  );
};
export default page;
