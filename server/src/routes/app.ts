import express from "express";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { userId, prisma } = req.context;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  res.send(200).json(user);

export default router;
