import { Request, Response } from "express";

const createFolder = async (req: Request, res: Response) => {
  const { prisma } = req.context;
  const { folderName } = req.body;
  const userId = req.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const folder = await prisma.folder.findFirst({
    where: { name: folderName },
  });

  if (folder) {
    res.status(400).json("Folder already exists.");
    return;
  }

  await prisma.folder.create({
    data: {
      user: { connect: { id: userId } },
      name: String(folderName),
    },
  });

  res.status(200).json("Folder created.");
};

export { createFolder };
