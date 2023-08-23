import { Request, Response } from "express";

const deleteProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const projectId = req.params.projectId;

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.status(200).json("Project deleted.");
  } catch (e: any) {
    console.log("Error deleting project: ", e);
    res.status(500).json("An error occurred.");
  }
};

export default deleteProject;
