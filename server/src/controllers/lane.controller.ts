import { Request, Response } from 'express';
import Lane, { ILane } from '../models/lane.model';
import { uuid } from '../utils/uuid.utils';
import projectService from '../services/project.service';


class LaneController {

  public async getLanes(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const projectId = req.params?.project_id;


      const projectExists = await projectService.checkProjectExists(projectId);
      if (!projectExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }

      const lanes = await Lane.find({ project_id: projectId });
      return res.status(200).json({
        status: 'success',
        data: lanes
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error creating lane'
      });
    }
  }

  // Create a new lane
  public async createLane(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const projectId = req.params?.project_id;
      const body = req.body as {
        name: string,
        order: number
      };
      if (projectId === undefined || body.name === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const createObject = {
        lane_id: uuid(),
        name: body.name,
        project_id: projectId,
        order: body.order || 0,
        created: {
          by: userId,
          date: Date.now()
        },
        updated: {
          by: userId,
          date: Date.now()
        }
      }

      const projectExists = await projectService.checkProjectExists(projectId);
      if (!projectExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }
      const newLane = new Lane(createObject);
      const lane = await newLane.save();
      return res.status(201).json({
        status: 'success',
        data: lane
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error creating lane'
      });
    }
  }

  // Update lane ex. lane name
  public async updateLane(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const laneId = req.params?.lane_id;
      const body = req.body as {
        name: string,
      };
      let updateObject: any = {
        updated: {
          by: userId,
          date: Date.now()
        }
      };
      if (body.name !== undefined) updateObject.name = body.name;

      if (body.name === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const lane = await Lane.findOneAndUpdate({ lane_id: laneId }, updateObject, { new: true });
      if (!lane) {
        return res.status(404).json({
          status: 'error',
          message: 'Lane not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: lane
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error update lane'
      });
    }
  }

  public async updateLanesOrder(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const projectId = req.params?.project_id;
      const body = req.body as {
        laneList: string[]
      };
      if (!body.laneList || !Array.isArray(body.laneList)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      // Prepare lanes to update
      const lanesToUpdate = body.laneList.map((laneId, index) => ({
        laneId,
        order: index
      }));

      // Create bulk operations for the update
      const bulkOps = lanesToUpdate.map(({ laneId, order }) => ({
        updateOne: {
          filter: {
            project_id: projectId,
            lane_id: laneId
          },
          update: {
            order: order,
            updated: {
              by: userId,
              date: Date.now()
            }
          }
        }
      }));

      // Execute bulk write operation
      const result = await Lane.bulkWrite(bulkOps);
      // Respond with success
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 'success',
          message: 'Lanes updated successfully'
        });
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'No lanes were updated; they may not exist or the order is unchanged.'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error update lane'
      });
    }
  }


}

export default new LaneController();
