import express from "express";

const router = express.Router();

import getAllFolders from "../controller/dashboard/get-all-folders";
import createFolder from "../controller/dashboard/create-folder";
import deleteFolder from "../controller/dashboard/delete-folder";
import deleteProject from "../controller/dashboard/delete-project";
import getFolderContents from "../controller/dashboard/get-folder-contents"
import createProject from "../controller/dashboard/create-project";
import getAllProjects from "../controller/dashboard/get-all-projects";
import editProfile from "../controller/dashboard/edit-profile";
// import getScreenshots from "../controller/dashboard/get-screenshots";
// import addScreenshot from "../controller/dashboard/add-screenshot";
// import deleteScreenshot from "../controller/dashboard/delete-screenshot";




router.get("/", getAllFolders);
router.post("/create-folder", createFolder);
router.delete("/delete-folder/:folderId", deleteFolder);
router.delete("/delete-project/:projectId", deleteProject);
router.get("/get-folder-contents/:folderId", getFolderContents);
router.post("/create-project", createProject);
router.get("/get-all-projects", getAllProjects)
router.patch("/edit-profile", editProfile)
// router.get("/get-screenshots/:projectId", getScreenshots)
// router.post("/add-screenshot", addScreenshot)
// router.delete("/delete-screenshot/:projectId/:screenshot", deleteScreenshot);


export default router;
