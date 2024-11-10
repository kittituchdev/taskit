import { Router } from 'express';
import LaneController from '../controllers/lane.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router: Router = Router();

// Get lanes in project
router.post('/projects/:project_id/lanes', authenticateJWT, LaneController.createLane);
// Update lane
router.patch('/lanes/:lane_id', authenticateJWT, LaneController.updateLane);
// Update the order of lanes
router.patch('/projects/:project_id/lanes/order', authenticateJWT, LaneController.updateLanesOrder);

export default router;
