import { Router } from "express";
import auth from "../middlewates/Auth";
import validateRequest from "../middlewates/validateRequest";
import { carsValidation } from "./cars.validation";
import { carController } from "./cars.controller";

const router=Router()
router.post('/',auth('user'),validateRequest(carsValidation.createCarValidationSchema),carController.createCars);

export const carsRouter=router;