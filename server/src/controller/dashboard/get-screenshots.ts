import { Request, Response } from 'express'

const getScreenshots = async (req: Request, res: Response) => {
    try {
        const { prisma } = req.context
        const projectId = req.params.projectId
        const project = await prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!project) {
            return res.status(400).json(
                'No Project was found to get screenshots from'
            )
        }

        res.status(200).json(project.screenshots)

    } catch (e: any) {
        res.status(500).json(
            "Error getting screenshots: " + e.message
        )
    }
}

export default getScreenshots