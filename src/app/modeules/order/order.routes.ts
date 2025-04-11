import { Router } from "express";
import auth from "../middlewates/Auth";
import { USER_ROLE } from "../user/user.contant";
import validateRequest from "../middlewates/validateRequest";
import { OrderValidations } from "./order.validation";
import { orderContoller } from "./order.controller";


const router=Router();
// ------------create order------------------
router.post(
    '/',
    auth(USER_ROLE.user,USER_ROLE.admin),
    validateRequest(OrderValidations.createOrderSchema),
    orderContoller.createOrder,
    
);
// --------------verify payment-----------------
router.get(
    '/verify-payment',
    auth(USER_ROLE.user,USER_ROLE.admin),
    orderContoller.verifyPayment,
);


// --------------get all order------------------
router.get(
    '/',
    auth( USER_ROLE.admin,USER_ROLE.user),
    orderContoller.getAllorders,
  );
// --------------get single order------------------

router.get(
    '/:orderId',
    auth(USER_ROLE.admin,USER_ROLE.user),
    orderContoller.getSingleOrder,
  );
// --------------update order------------------
router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(OrderValidations.updateOrderSchema),
    orderContoller.updateOrder,
);
// --------------delete order------------------
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    orderContoller.deleteOrder,
);
export const orderRouter=router;