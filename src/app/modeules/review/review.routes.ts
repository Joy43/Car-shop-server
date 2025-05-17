import { Router } from 'express';
import { ReviewControllers } from './review.controller';
import { USER_ROLE } from '../user/user.contant';
import auth from '../middlewates/Auth';
import validateRequest from '../middlewates/validateRequest';
import { ReviewValidation } from './review.validation';

const router = Router();

router.get(
    '/',
    auth(USER_ROLE.admin),ReviewControllers.getAllReviews
  
);
router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(ReviewValidation.createReviewValidationSchema),ReviewControllers.createReview
);

export const ReviewRoutes = router;