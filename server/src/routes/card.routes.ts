import { Router } from 'express';
import CardController from '../controllers/card.controller';

const router: Router = Router();

router.get('/lanes/:lane_id/cards', CardController.getCards);
router.post('/lanes/:lane_id/cards', CardController.createCard)
router.patch('/cards/:card_id', CardController.updateCard)
router.patch('/cards/:card_id/archive', CardController.deleteCard)

export default router;
