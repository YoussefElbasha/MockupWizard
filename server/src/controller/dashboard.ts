import { Request, Response, NextFunction } from "express";

const createFolder = async (req: any, res: Response) => {
  const { prisma } = req.context;
  const { folderName } = req.body;
  const { userId } = req.userId;

  const user = await prisma.user.findUnique({
    where: { userId },
  });

  if (!user) {
    res.status(400).json("User not found.");
    return;
  }

  const folder = await prisma.folder.create({
    user: user,
    name: String(folderName),
  });

  res.status(200).json("Folder created.");
};

const deleteFolder = async (req: any, res: Response) => {
  const { prisma } = req.context;
  const { folderId } = req.body;

  const folder = await prisma.folder.delete({
    where: { folderId },
  });

  res.status(200).json("Folder deleted.");
};

export { createFolder };
