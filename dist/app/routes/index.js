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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
