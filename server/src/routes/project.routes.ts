import { Router } from 'express';
import ProjectController from '../controllers/project.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router: Router = Router();

// Create a new project
router.post('/projects', ProjectController.createProject);
// Get all projects
router.get('/projects', ProjectController.getProjects);
// Get a project, lanes and cards
router.get('/projects/:project_id', ProjectController.getProjectByProjectId);
// Update project detail ex. project name, favorite
router.patch('/projects/:project_id', ProjectController.updateProject);
// Update project active status
router.patch('/projects/:project_id/active', ProjectController.updateProjectActive);

export default router;
