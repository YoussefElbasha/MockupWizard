import { Request, Response } from 'express'

const addScreenshot = async (req: Request, res: Response) => {
    try {
      const { prisma } = req.context
      const { projectId, screenshot } = req.body

      const project = await prisma.project.findUnique({
        where: {id: projectId}
      })

      if (!project) {
        return res.status(400).json('Project not found')
      }

      project.screenshots.push(screenshot)
      const newScreenshots = project.screenshots

      await prisma.project.update({
        where: { id: projectId },
        data: { screenshots: newScreenshots }
      })

        return res.status(200).json('Screenshot added successfully')
    } catch (e: any) {
        console.log("Error adding screenshot: ", e);
        return res.status(500).json("An error occurred.")
    }    
}

export default addScreenshot

