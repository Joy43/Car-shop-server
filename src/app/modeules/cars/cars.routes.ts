import { Router } from "express";
import auth from "../middlewates/Auth";
import validateRequest from "../middlewates/validateRequest";
import { carsValidation } from "./cars.validation";
import { carController } from "./cars.controller";
import { USER_ROLE } from "../user/user.contant";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../middlewates/bodyParse";


const router=Router()
router.post('/',auth(USER_ROLE.admin),
multerUpload.fields([{name:'images'}]),
parseBody,

validateRequest(carsValidation.createCarValidationSchema),carController.createCars);

export const carsRouter=router;