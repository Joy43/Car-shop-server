
import express from 'express';
import { adminController } from "./admin.controller";
;
import { USER_ROLE } from "../user/user.contant";
import auth from "../middlewates/Auth";

const router=express.Router()


router.patch("/:userId", auth(USER_ROLE.admin),adminController.blockUser);

export const AdminRouter=router;