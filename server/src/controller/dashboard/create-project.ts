import { Request, Response } from "express";

const createProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const { name, folderName } = req.body;

    await prisma.project.create({
      data: {
        folder: { connect: { name: String(folderName) } },
        name: String(name),
      },
    });

    return res.status(200).json("Created Project record and 3DModel record.");

  } catch (error) {
    console.log("Error creating project: ", error);
    return res.status(500).json("An error occurred.");
  }
};

export default createProject;
