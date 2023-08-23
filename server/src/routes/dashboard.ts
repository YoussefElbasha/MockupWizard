import express from "express";

const router = express.Router();

import getAllFolders from "../controller/dashboard/get-all-folders";
import createFolder from "../controller/dashboard/create-folder";
import deleteFolder from "../controller/dashboard/delete-folder";
import getProjectContents from '../controller/dashboard/get-project-contents';

router.get("/", getAllFolders);
router.post("/create-folder", createFolder);
router.delete("/delete-folder/:folderId", deleteFolder);
router.get("/get-project-contents/:projectId", getProjectContents);

export default router;
