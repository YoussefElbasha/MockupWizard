import express from "express";

const router = express.Router();

import { createFolder } from "../controller/dashboard/create-folder";

router.post("/create-folder", createFolder);

export default router;
