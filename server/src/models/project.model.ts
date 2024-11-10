import mongoose, { Schema, Document } from 'mongoose';
import { ILog } from '../interfaces/log.interface';

export interface IProject extends Document {
    project_id: string;
    name: string;
    favorite: boolean;
    active: boolean;
    created: ILog;
    updated: ILog;
}

const ProjectSchema: Schema = new Schema({
    project_id: { type: String, require: true, unique: true },
    name: { type: String, required: true },
    favorite: { type: Boolean },
    active: { type: Boolean, default: true },
    created: { type: Object, required: true },
    updated: { type: Object, required: true }
});

const Project = mongoose.model<IProject>('project', ProjectSchema);
export default Project;
