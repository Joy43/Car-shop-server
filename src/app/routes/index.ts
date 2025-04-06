import { Router } from "express";
import { userRouter } from "../modeules/user/user.route";
import { authRoute } from "../modeules/auth/auth.router";
import { carsRouter } from "../modeules/cars/cars.routes";
import { AdminRouter } from "../modeules/admin/admin.route";



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
    }
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;