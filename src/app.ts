import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './app/routes';
import os from 'os';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/modeules/middlewates/globalErrorhandler';
import status from 'http-status';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

app.use(cors({ origin: ['http://localhost:5173',
   'https://car-shop-clientsite.vercel.app'], credentials: true }));
app.use(cookieParser());

// ✅ Increase request payload limit to fix "request entity too large" error
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ----- API Endpoints --------
app.use('/api', router);

// Global error handler
app.use(globalErrorHandler);

// ----- Root API Endpoint ------
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Car Industry server is running now",
    version: "1.0.0",
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: "ssjoy370@gmail.com",
      website: "https://shahsultan-islam-joy.vercel.app/",
    },
  });
});

// Handle Not Found Routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
