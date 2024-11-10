// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uuid } from '../utils/uuid.utils';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key';

class UserController {

  public async register(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body as {
        email: string,
        password: string
      };

      const saltRounds = 10; // You can adjust the salt rounds as needed
      const hashedPassword = await bcrypt.hash(body.password, saltRounds);

      const userId = uuid();
      const createObject = {
        user_id: userId,
        email: body.email,
        password: hashedPassword,
        created: {
          by: userId,
          date: Date.now()
        },
        updated: {
          by: userId,
          date: Date.now()
        }
      }

      const newUser = new User(createObject);
      const user = await newUser.save();
      return res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'error',
        message: 'Error register'
      });
    }
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      const accessToken = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ user_id: user.user_id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      // Store the refresh token in the user document
      user.refreshToken = refreshToken;
      user.updated = {
        by: user.user_id,
        date: Date.now()
      };
      await user.save();

      return res.status(200).json({
        status: 'success',
        data: { accessToken, refreshToken }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error logging in'
      });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<any> {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token is required'
      });
    }

    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      return res.status(403).json({
        status: 'error',
        message: 'Invalid refresh token'
      });
    }

    jwt.verify(token, REFRESH_TOKEN_SECRET, (err: any) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: 'Invalid refresh token'
        });
      }

      const accessToken = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '15m' });

      return res.status(200).json({
        status: 'success',
        data: { accessToken }
      });
    });
  }
}

export default new UserController();
