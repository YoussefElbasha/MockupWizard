import express from "express";

const router = express.Router();

import getAllFolders from "../controller/dashboard/get-all-folders";
import createFolder from "../controller/dashboard/create-folder";
import deleteFolder from "../controller/dashboard/delete-folder";
import deleteProject from "../controller/dashboard/delete-project";
import getProjectContents from "../controller/dashboard/get-project-contents";
import getFolderContents from "../controller/dashboard/get-folder-contents";

router.get("/", getAllFolders);
router.post("/create-folder", createFolder);
router.delete("/delete-folder/:folderId", deleteFolder);
router.delete("/delete-project/:projectId", deleteProject);
router.get("/get-project-contents/:projectId", getProjectContents);
router.get("/get-folder-contents/:folderId", getFolderContents);

export default router;
