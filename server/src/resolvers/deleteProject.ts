import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteProject = async (projectId: string) => {
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  })
}

export default deleteProject