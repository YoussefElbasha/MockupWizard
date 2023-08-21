import express from "express";
import isAuthenticated from "../middleware/auth.middleware";

const router = express.Router();
router.use(isAuthenticated);

import { createFolder } from "../controller/dashboard";

router.post("/create-folder", createFolder);

export default router;
