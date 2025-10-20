import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { number } from "zod";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("MongoDB connected");

    const httpServer = http.createServer(app);

    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: [
          "http://localhost:5173",
          "https://car-shop-clientsite.vercel.app",
          "https://openrouter.ai/api/v1/chat/completions",
          "deepseek/deepseek-r1-distill-qwen-32b:free",
        ],
        credentials: true,
      },
    });

    httpServer.listen(config.PORT, () => {
      console.log(`Server listening on http://localhost:${config.PORT}`);
    });
    
  } catch (error) {
    console.error("Server error:", error);
  }
}

server();
