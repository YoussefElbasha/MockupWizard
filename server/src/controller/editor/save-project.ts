import { Request, Response } from "express"

const saveProject = async (req: Request, res: Response) => {
  try {
    const { prisma } = req.context
    const { projectId } = req.params
    const { color, modelType, designs, thumbnail } = req.body

    const projectDesigns = await prisma.design.findMany({
      where: {
        projectId
      }
    })

    const designsPromises = designs.map(async (design: any) => {
      const { url, top, left, scale, rotation } = design
      const designExists = projectDesigns.find((projectDesign) => projectDesign.designUrl === url)

      if (designExists) {
        return await prisma.design.update({
          where: {
            id: designExists.id,
          },
          data: {
            top,
            left,
            scale,
            rotation,
          },
        })
      } else {
        return await prisma.design.create({
          data: {
            designUrl: url,
            top,
            left,
            scale,
            rotation,
            projectId,
          },
        })
      }
    })

    const projectsToDelete = projectDesigns.filter((projectDesign) => {
      return !designs.find((design: any) => design.url === projectDesign.designUrl)
    })

    const projectsToDeletePromises = projectsToDelete.map(async (projectDesign) => {
      return await prisma.design.delete({
        where: {
          id: projectDesign.id,
        },
      })
    })

    const [designsResults] = await Promise.all([
      Promise.all(designsPromises),
      Promise.all(projectsToDeletePromises),
    ])

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        color,
        modelType,
        designs: {
          connect: designsResults.map((design) => ({ id: design.id })),
        },
        thumbnail,
      },
      include: {
        designs: true,
      }
    })

    res.status(200).json(project)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export default saveProject