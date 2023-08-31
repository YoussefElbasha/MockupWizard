import { Request, Response } from "express";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const userId = req.userId;

    const folders = await prisma.folder.findMany({
      where: { userId: userId },
      include: { projects: true }
    });

    var projects: any[] = [] // this variable will contain arrays of projects
    var singleProjects: any[] = [] // this variable will contain single projects not arrays

    for(const folder of folders) {
      projects.push(...folder.projects)
    }
    
    for(const p of projects) {
      for(const project of p) {
        singleProjects.push(project)
      }
    }

    if (!singleProjects) return res.status(400).json("No projects found.");

    return res.status(200).json(singleProjects);
  } catch (e: any) {
    console.log("Error getting all projects:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default getAllProjects;
