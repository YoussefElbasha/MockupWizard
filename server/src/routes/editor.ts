import express from "express"
import loadProject from "../controller/editor/load-project"
import saveProject from '../controller/editor/save-project'
import generateImageController from "../controller/editor/generate-image"
import enhahcePrompt from "../controller/editor/enhance-prompt";
import isAuthenticated from '../middleware/auth.middleware'

const router = express.Router()

router.use(isAuthenticated)
router.post("/enhance-prompt", enhahcePrompt);
router.get("/:projectId", loadProject)
router.post("/generate-image", generateImageController)
router.post("/:projectId", saveProject)

export default router