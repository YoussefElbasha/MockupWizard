import { Request, Response } from "express";

const editProfile = async (req: Request, res: Response) => {
  try {
    const { context, userId } = req;
    const { prisma } = context;
    const { username, picture } = req.body;

    const updateData: Record<string, any> = {};

    if (username !== undefined) {
      updateData.username = username;
    }
    if (picture !== undefined) {
      updateData.picture = picture;
    }

    // Update the project with the provided data
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.status(200).send("Profile edited.");
  } catch (error: any) {
    res.status(500).send("An error occurred.");
  }
};

export default editProfile;
