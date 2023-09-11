import { Request, Response } from "express"

const loadProject = async (req: Request, res: Response) => {
  try {
    const { userId, context } = req
    const { prisma } = context
    const { projectId } = req.params

    console.log({ projectId, userId })

    if (!userId) return res.status(401).json("Unauthorized.")

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      }
    })

    if (!user) return res.status(404).json("User not found.")

    const folder = await prisma.folder.findFirst({
      where: {
        projects: {
          some: {
            id: projectId,
          }
        },
        userId: userId,
      }
    })

    if (!folder) return res.status(404).json("Project not found.")

    const contents = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        designs: true
      }
    })

    if (!contents) return res.status(404).json("Project not found.")

    return res.status(200).json(contents)
  } catch (e: any) {
    console.log("Error getting project contents: ", e)
    return res.status(500).json("An error occurred.")
  }
}

export default loadProject
