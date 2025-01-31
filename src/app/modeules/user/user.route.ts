import express from 'express';
import validateRequest from '../middlewates/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './user.controller';

const router=express.Router();
router.post(
    '/user-create',
    validateRequest(UserValidation.userValidationSchema),
    userController.createUser
)
router.post('/create-admin', validateRequest(UserValidation.userValidationSchema), userController.createUser)
router.get('/',userController.getUser)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateUser)

export const userRouter=router;