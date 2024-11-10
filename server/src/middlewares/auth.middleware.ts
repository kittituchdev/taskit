import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void | any => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        // Return to stop execution after sending a response
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        // Assign the user to the request object
        req.user = user as { user_id: string };
        next(); // Call next to continue processing the request
    });
};
