import { Router } from "express";
import auth from "../middlewates/Auth";
import validateRequest from "../middlewates/validateRequest";
import { carsValidation } from "./cars.validation";
import { carController } from "./cars.controller";
import { USER_ROLE } from "../user/user.contant";

const router=Router()
router.post('/',auth(USER_ROLE.admin),validateRequest(carsValidation.createCarValidationSchema),carController.createCars);

export const carsRouter=router;