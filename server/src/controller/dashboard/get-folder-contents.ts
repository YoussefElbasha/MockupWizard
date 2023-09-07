import { Request, Response } from "express";

const getFolderContents = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const folderId = req.params.folderId;

    const folder = await prisma.folder.findFirst({
      where: { id: folderId }
    })

    if (!folder) return res.status(400).json("No such folder.");

    const projects = await prisma.project.findMany({
      where: { folderId: folderId },
    });

    const response = projects.map((p: any) => {
      return { id: p.id, name: p.name, thumbnail: p.thumbnail };
    });
    return res.status(200).json(response);
  } catch (e: any) {
    console.log("Error getting folder contents:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default getFolderContents;
