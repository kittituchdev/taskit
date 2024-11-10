import * as express from 'express';

// Extend the Request interface
declare global {
    namespace Express {
        interface Request {
            user?: {
                user_id: string; // Ensure this matches the structure of your JWT payload
            };
        }
    }
}