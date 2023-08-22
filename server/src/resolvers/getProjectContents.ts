import { PrismaClient, Project } from '@prisma/client'

const prisma = new PrismaClient()

const getProjectContents = async (project: Project) => {
  const contents = await prisma.project.findFirst({
    where: {
      id: project.id,
    },
  })

  if (contents)
    return {
      thumbnail: contents.thumbnail,
      screenshots: contents.screenshots,
    }

    return null
}

export default getProjectContents