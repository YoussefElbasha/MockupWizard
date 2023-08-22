import express from "express";

const router = express.Router();

import { createFolder } from "../controller/dashboard/create-folder";
import getAllFolders from "../controller/dashboard/get-all-folders";

router.post("/create-folder", createFolder);
router.get("/", getAllFolders);

export default router;
