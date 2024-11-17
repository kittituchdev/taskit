import { Router } from 'express';
import LaneController from '../controllers/lane.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router: Router = Router();

// Get lanes in project
router.get('/projects/:project_id/lanes', LaneController.getLanes);
// Create lane
router.post('/projects/:project_id/lanes', LaneController.createLane);
// Update lane
router.patch('/lanes/:lane_id', LaneController.updateLane);
// Update the order of lanes
router.patch('/projects/:project_id/lanes/order', LaneController.updateLanesOrder);

export default router;
