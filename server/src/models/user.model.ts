// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ILog } from '../interfaces/log.interface';

export interface IUser extends Document {
  user_id: string;
  email: string;
  password: string;
  refreshToken?: string;
  created: ILog;
  updated: ILog;
}

const UserSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  created: { type: Object, required: true },
  updated: { type: Object, required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
