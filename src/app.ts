import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import router from './app/routes';




const app:Application=express()
// parsers api
app.use(express.json());
app.use(cors());
// -----api end point--------
app.use('/api', router);


// -----root api endpoint------
app.get('/', (req:Request,res: Response) => {
  res.send({
    status: true,
    message: 'blog_post Server is running successfully 🏃🏽‍♂️➡️',
  });
});

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  })
})

export default app;
