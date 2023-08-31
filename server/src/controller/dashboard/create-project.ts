import { Request, Response } from "express";

const createProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const { name, modelId, folderId, thumbnail, screenshots } = req.body;
    
    await prisma.project.create({
      data: {
        folder: { connect: { id: String(folderId) } },
        Model: { connect: { id: String(modelId) } },
        modelId: String(modelId),
        name: String(name),
        thumbnail: thumbnail,
        screenshots: screenshots,
      },
    });

    return res.status(200).json("Created Project record and 3DModel record.");

  } catch (error) {
    console.log("Error creating project: ", error);
    return res.status(500).json("An error occurred.");
  }
};

export default createProject;
