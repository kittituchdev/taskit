import { Router } from 'express';
import CardController from '../controllers/card.controller';

const router: Router = Router();

// Card routes
router.get('/cards', CardController.getCards);
router.get('/cards/:id', CardController.getCardById);
router.post('/cards', CardController.createCard);
router.put('/cards/:id', CardController.updateCard);
router.delete('/cards/:id', CardController.deleteCard);

export default router;
