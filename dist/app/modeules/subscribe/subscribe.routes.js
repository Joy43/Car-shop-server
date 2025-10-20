"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeRoute = void 0;
const express_1 = require("express");
const subscribe_controller_1 = require("./subscribe.controller");
const router = (0, express_1.Router)();
router.post("/", subscribe_controller_1.SubscribeController.CreateSubscribe);
router.get("/");
exports.subscribeRoute = router;
