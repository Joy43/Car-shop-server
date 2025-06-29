import express from 'express';
import validateRequest from '../middlewates/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';
import auth from '../middlewates/Auth';
import { USER_ROLE } from './user.contant';
import { AdminValidations } from '../admin/admin.validation';

const router=express.Router();
// ------CREATE USER--------
router.post(
    '/user-create',
    validateRequest(UserValidation.userValidationSchema),
    userController.createUser
)
// ------CREATE ADMIN--------
router.post(
    '/create-admin',
   auth(USER_ROLE.admin),
   validateRequest(AdminValidations.createAdminValidationSchema),
   userController.createAdmin,
);
// ------GET USER--------
router.get('/',auth(USER_ROLE.admin),userController.getUser);
// ------GET SINGLE USER--------
router.get('/:userId', userController.getSingleUser);

router.put('/:userId', userController.updateUser);
// ------UPDATE USER--------
router.patch('/:userId', userController.updateUser);
// ------DELETE USER--------

router.delete('/:userId', userController.deleteUser);
export const userRouter=router;