import { Request, Response } from "express";
import { ChatbotService } from "./chatbot.service";
import sendResponse from "../utils/sendRequest";
import status from "http-status";

const askGemini = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }
    const result = await ChatbotService.CreateaskGemini(prompt);
    sendResponse(res,{
         statusCode: status.OK,
              success: true,
              message: 'promt create sucessfully successfully',
              data: result,
    })
};

// -------------get gemenini-----------
const GetaskGemini = async (req: Request, res: Response) => {
  
    const result = await ChatbotService.GetaskGemini();
    sendResponse(res,{
         statusCode: status.OK,
              success: true,
              message: 'retrive sucessfully sucessfully successfully',
              data: result,
    })
   
};

// const createImageFromPrompt = async (req: Request, res: Response) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     res.status(400).json({ error: "Prompt is required" });
//     return;
//   }

//   try {
//     const imagePath = await ChatbotService.CreateImageFromPrompt(prompt);
//     sendResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: "Image created successfully",
//       data: imagePath,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate image", details: error });
//   }
// };
export const ChatbotController = {
  askGemini,
  GetaskGemini,

}
