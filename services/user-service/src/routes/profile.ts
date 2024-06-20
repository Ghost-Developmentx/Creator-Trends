// services/user-service/src/routes/profile.ts
import { Router } from "express";
import { getProfile, updateProfile } from "@controllers/profileController";

const router = Router();

router.get("/:id", getProfile);
router.put("/:id", updateProfile);

export default router;