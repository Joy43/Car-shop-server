"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modeules/user/user.route");
const auth_router_1 = require("../modeules/auth/auth.router");
const cars_routes_1 = require("../modeules/cars/cars.routes");
const admin_route_1 = require("../modeules/admin/admin.route");
const order_routes_1 = require("../modeules/order/order.routes");
const review_routes_1 = require("../modeules/review/review.routes");
const chat_routes_1 = require("../modeules/chat/chat.routes");
const chatbot_routes_1 = require("../modeules/chatbot/chatbot.routes");
const wishlist_routes_1 = require("../modeules/wishlist/wishlist.routes");
const contract_routes_1 = require("../modeules/contract/contract.routes");
const subscribe_routes_1 = require("../modeules/subscribe/subscribe.routes");
const blog_routes_1 = require("../modeules/blog/blog.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRouter
    },
    {
        path: '/auth',
        route: auth_router_1.authRoute
    },
    {
        path: '/cars',
        route: cars_routes_1.carsRouter
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRouter,
    },
    {
        path: '/order',
        route: order_routes_1.orderRouter,
    },
    {
        path: '/review',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/chat',
        route: chat_routes_1.MessageRoute,
    },
    {
        path: '/chatbot',
        route: chatbot_routes_1.chatbotRoute,
    },
    {
        path: '/wishlist',
        route: wishlist_routes_1.Wishlistrouter,
    },
    {
        path: '/contract',
        route: contract_routes_1.contractRoute,
    },
    {
        path: '/subscribe',
        route: subscribe_routes_1.subscribeRoute,
    },
    {
        path: '/carblog',
        route: blog_routes_1.blogsRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
