"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modeules/user/user.route");
const auth_router_1 = require("../modeules/auth/auth.router");
const cars_routes_1 = require("../modeules/cars/cars.routes");
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
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
