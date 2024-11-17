import Lane from "../models/lane.model";


class LaneService {
    public async checkLaneExists(laneId: string): Promise<boolean> {
        const lane = await Lane.findOne({ lane_id: laneId });
        if (!lane) {
            return false;
        } else {
            return true;
        }
    }
}

export default new LaneService();
