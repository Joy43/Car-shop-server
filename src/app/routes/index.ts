import { Router } from "express";
import { userRouter } from "../modeules/user/user.route";
import { authRoute } from "../modeules/auth/auth.router";

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
    

]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;