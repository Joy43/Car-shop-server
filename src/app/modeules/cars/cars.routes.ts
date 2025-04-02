import { Router } from "express";
import auth from "../middlewates/Auth";
import validateRequest from "../middlewates/validateRequest";
import { carsValidation } from "./cars.validation";
import { carController } from "./cars.controller";
import { USER_ROLE } from "../user/user.contant";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../middlewates/bodyParse";


const router=Router()
// --------create car product-----------
router.post('/',auth(USER_ROLE.admin),
multerUpload.fields([{name:'images'}]),
parseBody,
validateRequest(carsValidation.createCarValidationSchema),carController.createCars);



// ----------update product car-------------
router.patch(
    
    '/:productId',
    auth(USER_ROLE.admin),
    multerUpload.fields([{name:'images'}]),
    parseBody,
    carController.updateCar

);
// ------get single car product --------------

router.get('/:productId',carController.getSiglecarProduct);
// ------get all car product-------------
router.get('/',carController.getAllCars);
// --------delete car------------

router.delete(
    '/:productId',
    auth(USER_ROLE.admin),
    carController.deleteCar
);
export const carsRouter=router;