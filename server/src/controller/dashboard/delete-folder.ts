import { Request, Response } from "express";

const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const folderId = req.params.folderId;

    await prisma.folder.delete({
      where: { id: folderId },
    });

    return res.status(200).json("Folder deleted.");
  } catch (e: any) {
    return res.status(500).json("An error occurred.");
  }
};

export default deleteFolder;
