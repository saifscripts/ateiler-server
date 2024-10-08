import cors from 'cors';
import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

// parsers
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/', router);

// test route
app.get('/', (_req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: 'App is running successfully!',
    });
});

// globalError handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
