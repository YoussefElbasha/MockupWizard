import { Request, Response } from "express";

const deleteScreenshot = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const projectId = req.params.projectId;
    const screenshot = req.params.screenshot;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });

    if (project) {
      const index = project.screenshots.indexOf(screenshot);
      project.screenshots.splice(index, 1);

      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          screenshots: project.screenshots,
        },
      });
    }

    return res.status(200).json("Screenshot deleted.");
  } catch (e: any) {
    console.log("Error deleting Screenshot: ", e);
    return res.status(500).json("An error occurred.");
  }
};

export default deleteScreenshot;
