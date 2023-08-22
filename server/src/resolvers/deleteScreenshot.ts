import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteScreenshot = async (projectId: string, screenshot: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  })

  if(project)
  {
    const index = project.screenshots.indexOf(screenshot)
    project.screenshots.splice(index, 1)

    await prisma.project.update({
        where: {
          id: project.id
        },
        data: {
          screenshots: project.screenshots
        }
      });
  }
}

export default deleteScreenshot