import { Router } from "express";
import { ChatbotController } from "./chatbot.controller";



const router = Router();

router.post("/",ChatbotController.askGemini );
router.get("/",ChatbotController.GetaskGemini);
// router.post("/image", ChatbotController.createImageFromPrompt);
export const chatbotRoute= router;
