import { ILog } from "./log.interface";

export interface IComment {
    text: string;
    created: ILog;
    updated: ILog;
}