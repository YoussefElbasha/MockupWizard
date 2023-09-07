import { Request, Response } from "express";

const deleteDesign = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const designId = req.params.folderId;

    await prisma.design.delete({
      where: { id: designId },
    });

    return res.status(200).json("Design deleted.");
  } catch (e: any) {
    console.log("Error deleting Design: ", e);
    return res.status(500).json("An error occurred.");
  }
};

export default deleteDesign;