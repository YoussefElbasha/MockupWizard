import { Request, Response } from "express";

const createFolder = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const { folderName } = req.body;
    const userId = req.userId;

    const folder = await prisma.folder.create({
      data: {
        user: { connect: { id: userId } },
        name: String(folderName),
      },
    });

    res.status(200).json(folder);
  } catch (e: any) {
    return res.status(500).json("An error occurred.");
  }
};

export default createFolder;
