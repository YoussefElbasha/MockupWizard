import { Request, Response } from "express";

const loadProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const projectId = req.params.projectId;

    const contents = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        designs: true
      }
    });

    if (!contents) return res.status(404).json("Project not found.");

    return res.status(200).json(contents);
  } catch (e: any) {
    console.log("Error getting project contents: ", e);
    return res.status(500).json("An error occurred.");
  }
};

export default loadProject
