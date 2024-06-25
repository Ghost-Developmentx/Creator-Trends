// services/user-service/src/routes/profile.ts
import { Router } from "express";
import {
  getProfile,
  updateProfile,
  getAllProfiles,
} from "@controllers/profileController";

const router = Router();

router.get("/:id", getProfile);
router.put("/:id", updateProfile);
router.get("/", getAllProfiles);

export default router;
