import { Router } from "express";
import { AuthController } from "./auth.controller";

import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../middlewates/validateRequest";

const router= Router();
router.post('/register',validateRequest(UserValidation.userValidationSchema),AuthController.register)
router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthController.login);

export const authRoute=router;