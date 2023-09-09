import { Request, Response } from "express";

const saveProject = async (req: Request, res: Response) => {
  try {

    console.log("saveProject: ", req)

    const { prisma } = req.context;
    const { projectId } = req.params;
    const { color, modelType, designs } = req.body;

    await prisma.project.update({
      where: { id: projectId },
      data: {
        color,
        modelType,
        designs: {
          set: designs
        },
      },
    })

    res.status(200).send("Editor saved.");
  } catch (error: any) {
    console.log("Error saving editor: ", error);
    res.status(500).send("An error occurred.");
  }
};

export default saveProject