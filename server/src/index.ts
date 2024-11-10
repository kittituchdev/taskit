import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import userRoutes from './routes/user.routes';
import projectRoutes from './routes/project.routes';
import laneRoutes from './routes/lane.routes';
import cardRoutes from './routes/card.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '5000');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    }
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: [
        './src/routes/*.routes.ts'
    ]
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        console.log('Try to connect to MongoDB');
        const dbUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURIComponent(process.env.MONGO_PASSWORD as string)}@${process.env.MONGO_HOST}`;
        await mongoose.connect(dbUri, {
            dbName: process.env.MONGO_NAME
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();


app.get('/swagger.json', (req, res): void => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

// Api documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Taskit!');
});

// App routes
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', laneRoutes);
app.use('/', cardRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
