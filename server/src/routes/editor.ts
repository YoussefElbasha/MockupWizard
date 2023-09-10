import express from "express"
import loadProject from "../controller/editor/load-project"
import saveProject from '../controller/editor/save-project'
import generateImageController from "../controller/editor/generate-image"

const router = express.Router()

router.get("/:projectId", loadProject)
router.post("/generate-image", generateImageController)
router.post("/:projectId", saveProject)

export default router