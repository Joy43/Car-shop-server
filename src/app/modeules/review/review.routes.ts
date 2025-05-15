import { Router } from 'express';
import { ReviewControllers } from './review.controller';
import { USER_ROLE } from '../user/user.contant';
import auth from '../middlewates/Auth';

const router = Router();

router.get(
    '/',
    auth(USER_ROLE.admin),
    ReviewControllers.getAllReviews
);
router.post(
    '/',
    auth(USER_ROLE.user),
    ReviewControllers.createReview
);

export const ReviewRoutes = router;