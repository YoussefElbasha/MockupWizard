"use client";
import toast from "react-hot-toast";
import ImageCard from "../components/dalle-components/imagecard";
import TextInput from "../components/dalle-components/TextInput";
import { motion } from "framer-motion";
import React, { useState } from "react";
import api from "../../../util/Axios";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PAGE_API_ENDPOINT = "http://api.app.localhost:4000/api/generate-image";

const Page = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmission = async (prompt: string) => {
    try {
      setIsLoading(true);
      setIsDialogOpen(true);
      const response = await axios.post(PAGE_API_ENDPOINT, { prompt });
      const images = response.data;
      setUrls(images);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="bg-background m-auto min-h-screen flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ top: "21%", left: "6%", x: "0%", y: "0%", opacity: 1 }}
        animate={{ top: "20%", left: "36%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-secondary rounded-full blur-3xl opacity-50" />
      </motion.div>
      <motion.div
        initial={{ top: "57%", left: "13%", x: "0%", y: "0%", opacity: 1 }}
        animate={{ top: "57%", left: "47%", x: "0%", y: "0%", opacity: 1 }}
        transition={{ duration: 0.2, delay: 0 }}
        className="absolute z-0"
      >
        <div className="w-60 h-60 bg-primary rounded-full blur-3xl opacity-50" />
      </motion.div>
      <TextInput onSubmit={handleSubmission} />
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose an Image</DialogTitle>
            </DialogHeader>
            {isLoading ? (
              // Render loading content while isLoading is true
              <p>Loading...</p>
            ) : (
              // Render image cards when isLoading is false
              <div className="flex flex-row gap-2">
                {urls.map((url: string) => (
                  <ImageCard key={url} imageUrl={url} onClick={() => {}} />
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Page;
