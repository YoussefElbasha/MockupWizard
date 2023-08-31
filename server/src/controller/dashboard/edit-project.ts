import { Request, Response } from "express";

const editProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const { id, folderId, name, modelId, thumbnail, screenshots } = req.body;

    await prisma.project.update({
      where: { id: id },
      data: {
        folder: { connect: { id: folderId } },
        name,
        Model: { connect: { id: modelId } },
        thumbnail,
        screenshots,
      },
    });
    res.status(200).send("Project edited.");
  } catch (error: any) {
    console.log("Error editing project: ", error);
    res.status(500).send("An error occurred.");
  }
};

export default editProject;