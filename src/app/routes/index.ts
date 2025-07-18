import { Router } from "express";
import { userRouter } from "../modeules/user/user.route";
import { authRoute } from "../modeules/auth/auth.router";
import { carsRouter } from "../modeules/cars/cars.routes";
import { AdminRouter } from "../modeules/admin/admin.route";
import { orderRouter } from "../modeules/order/order.routes";
import { ReviewRoutes } from "../modeules/review/review.routes";
import { MessageRoute } from "../modeules/chat/chat.routes";
import { chatbotRoute } from "../modeules/chatbot/chatbot.routes";
import { Wishlistrouter } from "../modeules/wishlist/wishlist.routes";
import { contractRoute } from "../modeules/contract/contract.routes";
import { subscribeRoute } from "../modeules/subscribe/subscribe.routes";
import { blogsRoute } from "../modeules/blog/blog.routes";



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
    {
        path:'/chat',
        route:MessageRoute,
    },
    {
        path:'/chatbot',
        route:chatbotRoute,
    },
    {
        path:'/wishlist',
        route:Wishlistrouter,
    },
    {
        path:'/contract',
        route:contractRoute,
    },
    {
        path:'/subscribe',
        route:subscribeRoute,
    },
    {
        path:'/carblog',
        route:blogsRoute,
    },
    


]
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;