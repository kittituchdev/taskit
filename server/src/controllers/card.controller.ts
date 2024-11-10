import { Request, Response } from 'express';
import Card from '../models/card.model';

class CardController {
  // Get all cards
  public async getCards(req: Request, res: Response): Promise<void> {
    try {
      const cards = await Card.find();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cards' });
    }
  }

  // Get a card by ID
  public async getCardById(req: Request, res: Response): Promise<void> {
    try {
      const card = await Card.findById(req.params.id);
      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching card' });
    }
  }

  // Create a new card
  public async createCard(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const newCard = new Card({ name, email, password });
      const card = await newCard.save();
      res.status(201).json(card);
    } catch (error) {
      res.status(500).json({ error: 'Error creating card' });
    }
  }

  // Update a card
  public async updateCard(req: Request, res: Response): Promise<void> {
    try {
      const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.status(200).json(card);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating card' });
    }
  }

  // Delete a card
  public async deleteCard(req: Request, res: Response): Promise<void> {
    try {
      const card = await Card.findByIdAndDelete(req.params.id);
      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.status(200).json({ message: 'Card deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting card' });
    }
  }
}

export default new CardController();
