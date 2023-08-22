import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const deleteDesign = async (designId: string) => {
  await prisma.design.delete({
    where: {
      id: designId,
    },
  })
}

export default deleteDesign