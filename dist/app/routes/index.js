"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modeules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRouter
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
