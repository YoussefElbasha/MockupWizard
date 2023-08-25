import { Request, Response } from "express";

const loadModel = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context;
    const modelId = req.params.modelId;

    const model = await prisma.model.findFirst({
      where: { id: modelId },
    });

    if (!model) return res.status(400).json("No Model found.");

    return res.status(200).json(model);
  } catch (e: any) {
    console.log("Error getting Model:", e);
    return res.status(500).json("An error occurred.");
  }
};

export default loadModel;