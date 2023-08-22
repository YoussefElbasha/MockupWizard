import { Request, Response } from "express";

const createFolder = async (req: Request, res: Response) => {
  try {
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
      return res.status(400).json("Folder already exists.");
    }

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

export { createFolder };
