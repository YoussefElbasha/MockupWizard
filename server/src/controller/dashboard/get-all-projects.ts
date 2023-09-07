import { Request, Response } from "express";

/*const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const userId = req.userId;

    const folders = await prisma.folder.findMany({
      where: { userId: userId },
      include: { projects: true },
    });

    var projects: any[] = [];

    for (const folder of folders) {
      projects.push(...folder.projects);
    }

    if (!projects) return res.status(400).json("No projects found.");

    return res.status(200).json(projects);
  } catch (e: any) {
    console.log("Error getting all projects:", e);
    return res.status(500).json("An error occurred.");
  }
};*/

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const userId = req.userId;

    const projects = await prisma.project.findMany({
      where: {
        folder: {userId: userId},
      },
    });

    if(!projects) return res.status(400).json("No projects found.") 

    res.status(200).json(projects);

  } catch(e: any) {
    console.log("Error getting all projects:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default getAllProjects;
