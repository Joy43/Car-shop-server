import { Router } from "express";
import { ChatbotController } from "./chatbot.controller";



const router = Router();

router.post("/",ChatbotController.askGemini );

export const chatbotRoute= router;
