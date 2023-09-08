import express from "express";
import generateImageController from "../controller/editor/generate-image";
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

router.post("/generate-image", generateImageController);

export default router;
