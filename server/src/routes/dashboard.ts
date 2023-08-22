import express from "express";

const router = express.Router();

import { createFolder } from "../controller/dashboard";

router.post("/create-folder", createFolder);

export default router;
