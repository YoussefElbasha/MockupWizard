import express from "express";

const router = express.Router();

import getAllFolders from "../controller/dashboard/get-all-folders";
import createFolder from "../controller/dashboard/create-folder";
import deleteFolder from "../controller/dashboard/delete-folder";
import deleteScreenshot from "../controller/dashboard/delete-screenshot";
import deleteProject from "../controller/dashboard/delete-project";
import getProjectContents from '../controller/dashboard/get-project-contents';
import deleteDesign from "../controller/dashboard/delete-design";

router.get("/", getAllFolders);
router.post("/create-folder", createFolder);
router.delete("/delete-folder/:folderId", deleteFolder);
router.delete("/delete-screenshot/:projectId/:screenshot", deleteScreenshot);
router.delete("/delete-project/:projectId", deleteProject);
router.get("/get-project-contents/:projectId", getProjectContents);
router.delete("/delete-design/:designId", deleteDesign);

export default router;
