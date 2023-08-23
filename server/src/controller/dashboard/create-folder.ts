import { Request, Response } from "express";

const createFolder = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const { folderName } = req.body;
    const userId = req.userId;

    await prisma.folder.create({
      data: {
        user: { connect: { id: userId } },
        name: String(folderName),
      },
    });

    return res.status(200).json("Folder created.");
  } catch (e: any) {
    console.log("Error creating folder:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default createFolder;
