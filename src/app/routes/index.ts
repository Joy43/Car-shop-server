import { Router } from "express";
import { userRouter } from "../modeules/user/user.route";
import { authRoute } from "../modeules/auth/auth.router";
import { carsRouter } from "../modeules/cars/cars.routes";
import { AdminRouter } from "../modeules/admin/admin.route";
import { orderRouter } from "../modeules/order/order.routes";
import { ReviewRoutes } from "../modeules/review/review.routes";



const router=Router();
const moduleRoutes= [
 
    {
        path:'/user',
        route:userRouter
    }, 
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/cars',
        route:carsRouter
    },
    {
        path:'/admin',
        route:AdminRouter,
    },
    {
        path:'/order',
        route:orderRouter,
    },
    {
        path:'/review',
        route:ReviewRoutes,
    },
    
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;