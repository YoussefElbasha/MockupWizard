import express from "express"
import loadProject from "../controller/editor/load-project"
import saveProject from '../controller/editor/save-project'
// import deleteDesign from "../controller/editor/delete-design"
// import editProject from "../controller/dashboard/edit-project";

const router = express.Router()

router.get("/:projectId", loadProject)
// router.post("/generate-image", generateImageController)
router.post("/:projectId", saveProject)
// router.delete("/delete-design/:designId", deleteDesign)
// router.put("/edit-project", editProject)

export default router