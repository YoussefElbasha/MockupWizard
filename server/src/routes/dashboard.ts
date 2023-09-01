import express from "express";

const router = express.Router();

import getAllFolders from "../controller/dashboard/get-all-folders";
import createFolder from "../controller/dashboard/create-folder";
import deleteFolder from "../controller/dashboard/delete-folder";
import deleteScreenshot from "../controller/dashboard/delete-screenshot";
import deleteProject from "../controller/dashboard/delete-project";
import getFolderContents from "../controller/dashboard/get-folder-contents";
import getProjectContents from "../controller/dashboard/get-project-contents";
import deleteDesign from "../controller/dashboard/delete-design";
import createProject from "../controller/dashboard/create-project";
// import saveEditor from "../controller/dashboard/save-editor";
import getAllProjects from "../controller/dashboard/get-all-projects";
// import editProject from "../controller/dashboard/edit-project";



router.get("/", getAllFolders);
router.post("/create-folder", createFolder);
router.delete("/delete-folder/:folderId", deleteFolder);
router.delete("/delete-screenshot/:projectId/:screenshot", deleteScreenshot);
router.delete("/delete-project/:projectId", deleteProject);
router.get("/get-project-contents/:projectId", getProjectContents);
router.get("/get-folder-contents/:folderId", getFolderContents);
router.delete("/delete-design/:designId", deleteDesign);
router.post("/create-project", createProject);
// router.post("/save-editor", saveEditor)
router.get("/get-all-projects", getAllProjects)
// router.put("/edit-project", editProject)


export default router;
