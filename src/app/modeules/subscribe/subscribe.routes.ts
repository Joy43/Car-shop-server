import { Router } from "express";
import { SubscribeController } from "./subscribe.controller"
const router = Router();

router.post("/",SubscribeController.CreateSubscribe );
router.get("/",);

export const subscribeRoute= router;
