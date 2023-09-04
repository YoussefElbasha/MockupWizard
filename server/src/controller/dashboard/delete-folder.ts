import { Request, Response } from "express";

const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const folderName = req.params.folderName;

    await prisma.project.deleteMany({
      where: { folderName },
    });

    await prisma.folder.delete({
      where: { name: folderName },
    });

    return res.status(200).json("Folder deleted.");
  } catch (e: any) {
    console.log("Error deleting folder: ", e);
    return res.status(500).json("An error occurred.");
  }
};

export default deleteFolder;
