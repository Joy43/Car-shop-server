import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('MongoDB connected');

    const httpServer = http.createServer(app);

    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: [
          'http://localhost:5173',
          'https://car-shop-clientsite.vercel.app',
          'https://openrouter.ai/api/v1/chat/completions',
          'deepseek/deepseek-r1-distill-qwen-32b:free',
        ],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Example: listen for a message from client and reply
      socket.on('message', (data) => {
        console.log('Received message:', data);

        // Echo back the message
        socket.emit('messageResponse', `Server received: ${data}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    httpServer.listen(config.port, () => {
      console.log(`Server listening on http://localhost:${config.port}`);
    });

  } catch (error) {
    console.error('Server error:', error);
  }
}

server();
