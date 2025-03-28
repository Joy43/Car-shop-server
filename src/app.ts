import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import router from './app/routes';
import os from 'os';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/modeules/middlewates/globalErrorhandler';
import status from 'http-status';
import { StatusCodes } from 'http-status-codes';


const app:Application=express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
// parsers api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -----api end point--------
app.use('/api', router);

//-------------global error handler-------------------
app.use(globalErrorHandler)
// -----root api endpoint------
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "car industy server is running Now",
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


//----------------handle not found----------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
