import mongoose, { Schema, Document } from 'mongoose';
import { ILog } from '../interfaces/log.interface';

export interface ILane extends Document {
    lane_id: string;
    name: string;
    project_id: string;
    order: number;
    active: boolean,
    created: ILog;
    updated: ILog;
}

const LaneSchema: Schema = new Schema({
    lane_id: { type: String, require: true, unique: true },
    name: { type: String, required: true },
    project_id: { type: String, require: true },
    order: { type: Number, require: true, default: 0 },
    active: { type: Boolean, default: true },
    created: { type: Object, required: true },
    updated: { type: Object, required: true }
});

const Lane = mongoose.model<ILane>('lane', LaneSchema);
export default Lane;
