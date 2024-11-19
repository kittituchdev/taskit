import mongoose, { Schema, Document } from 'mongoose';
import { ILog } from '../interfaces/log.interface';
import { IChecklist } from '../interfaces/checklist.interface';
import { IComment } from '../interfaces/comment.interface';

export interface ICard extends Document {
    card_id: string;
    title: string;
    description?: string;
    comments?: IComment[];
    lane_id: string;
    order: number;
    active: boolean,
    checklist?: IChecklist[];
    created: ILog;
    updated: ILog;
}

const CardSchema: Schema = new Schema({
    card_id: { type: String, require: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    comment: { type: Array<Object> },
    lane_id: { type: String, require: true },
    order: { type: Number, require: true },
    active: { type: Boolean, default: true },
    checklist: { type: Array<Object>},
    created: { type: Object, required: true },
    updated: { type: Object, required: true }
});

const Card = mongoose.model<ICard>('card', CardSchema);
export default Card;
