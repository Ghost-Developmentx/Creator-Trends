"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// services/user-service/src/routes/profile.ts
const express_1 = require("express");
const profileController_1 = require("@controllers/profileController");
const router = (0, express_1.Router)();
router.get("/:id", profileController_1.getProfile);
router.put("/:id", profileController_1.updateProfile);
exports.default = router;
