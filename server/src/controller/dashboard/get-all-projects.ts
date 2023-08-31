import { Request, Response } from "express";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const folderId = req.params.folderId;

    const projects = await prisma.project.findMany({
      where: { folderId: folderId },
    });

    if (!projects) return res.status(400).json("No projects found.");

    return res.status(200).json(projects);
  } catch (e: any) {
    console.log("Error getting all projects:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default getAllProjects;
