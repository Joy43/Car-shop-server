import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors()); // Uncomment this line if you need CORS support

// Example API routes
app.use('/api', (req: Request, res: Response) => {
  res.send({ message: 'This is the /api endpoint' });
});

// Root API endpoint
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'blog_post Server is running successfully 🏃🏽‍♂️➡️',
  });
});

// Middleware to handle 404 errors
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Resource not found',
  });
});

export default app;
