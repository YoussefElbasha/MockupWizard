import { Request, Response } from "express";

const getAllFolders = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const userId = req.userId;

    const folders = await prisma.folder.findMany({
      where: { userId: userId },
    });

    if (!folders) return res.status(400).json("No folders found.");

    return res.status(200).json(folders);
  } catch (e: any) {
    console.log("Error getting all folders:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default getAllFolders;
