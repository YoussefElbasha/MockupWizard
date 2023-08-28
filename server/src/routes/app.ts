import express from "express";
import { generateImage } from "../lib/generate-image";
const router = express.Router();

router.get("/me", async (req, res) => {
  const { prisma } = req.context;
  const userId = req.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  res.json(user);
});

router.post("/generate-image", async (req, res) => {
  const prompt = req.body.prompt;
  const imageUrl = await generateImage(prompt);
  res.json({ imageUrl });
});

export default router;
