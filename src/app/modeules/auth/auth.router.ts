import { Router } from "express";
import { AuthController } from "./auth.controller";

import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../middlewates/validateRequest";

const router= Router();
// -----------register -------------
router.post('/register',
    validateRequest(UserValidation.userValidationSchema),AuthController.register)
    // -----------login -------------
router.post('/login',
     validateRequest(AuthValidation.loginValidationSchema), AuthController.login);
    //  --------refresh token-------
     router.post(
        '/refresh-token',
        validateRequest(AuthValidation.refreshTokenValidationSchema),
        AuthController.refreshTokens,
      );
export const authRoute=router;