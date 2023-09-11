import { Request, Response } from "express";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const userId = req.userId;

    const projects = await prisma.project.findMany({
      where: {
        folder: { userId: userId },
      },
    });

    if (!projects) return res.status(400).json("No projects found.");

    res.status(200).json(projects);
  } catch (e: any) {
    return res.status(500).json("An error occurred.");
  }
};

export default getAllProjects;
