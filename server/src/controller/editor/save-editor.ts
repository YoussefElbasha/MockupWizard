// import { Request, Response } from "express";

// const saveEditor = async (req: Request, res: Response) => {
//   try {
//     const { prisma } = req.context;
//     const { projectId, color, modelType, designs } = req.body;

//     await prisma.model.create({
//       data: {
//         project: { connect: { id: projectId } },
//         color,
//         modelType,
//         designs,
//       },
//     });
//     res.status(200).send("Editor saved.");
//   } catch (error: any) {
//     console.log("Error saving editor: ", error);
//     res.status(500).send("An error occurred.");
//   }
// };

// export default saveEditor;