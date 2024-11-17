import { Request, Response } from 'express';
import Card from '../models/card.model';
import projectService from '../services/project.service';
import laneService from '../services/lane.service';
import { uuid } from '../utils/uuid.utils';

class CardController {

  // Get all cards
  public async getCards(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const laneId = req.params?.lane_id;

      const laneExists = await laneService.checkLaneExists(laneId);
      if (!laneExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Lane not found'
        });
      }

      const cards = await Card.find({ lane_id: laneId });
      if (Array.isArray(cards) && cards.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Card not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: cards
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error fetching lane'
      });
    }
  }

  // Get a card by ID
  public async getCardById(req: Request, res: Response): Promise<any> {
    try {
      const cardId = req.params?.card_id;
      if (!cardId) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const card = await Card.findOne({ card_id: cardId });
      if (!card) {
        return res.status(404).json({
          status: 'error',
          message: 'Card not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: card
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error fetching card'
      });
    }
  }

  public async createCard(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const laneId = req.params?.lane_id;

      const laneExists = await laneService.checkLaneExists(laneId);
      if (!laneExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Lane not found'
        });
      }
      const body = req.body as {
        title: string,
        description?: string,
        order?: number
      };
      const createObject = {
        card_id: uuid(),
        title: body.title,
        description: body.description,
        lane_id: laneId,
        order: body.order ?? 0,
        created: {
          by: userId,
          date: Date.now()
        },
        updated: {
          by: userId,
          date: Date.now()
        }
      }
      const newCard = new Card(createObject);
      const card = await newCard.save();
      return res.status(201).json({
        status: 'success',
        data: card
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error creating project'
      });
    }
  }

  public async updateCard(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const cardId = req.params?.card_id;
      const body = req.body as {
        title?: string,
        description?: string
      };
      let updateObject: any = {
        updated: {
          by: userId,
          date: Date.now()
        }
      };
      if (body.title !== undefined) updateObject.title = body.title;
      if (body.description !== undefined) updateObject.description = body.description;

      if (updateObject.title === undefined && updateObject.description === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const card = await Card.findOneAndUpdate({ card_id: cardId }, updateObject, { new: true });
      if (!card) {
        return res.status(404).json({
          status: 'error',
          message: 'Card not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: card
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error update card'
      });
    }
  }

}

export default new CardController();
