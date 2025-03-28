import { Router } from "express";
import { userRouter } from "../modeules/user/user.route";
import { authRoute } from "../modeules/auth/auth.router";
import { carsRouter } from "../modeules/cars/cars.router";

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
    }
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;