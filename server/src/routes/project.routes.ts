import { Router } from 'express';
import ProjectController from '../controllers/project.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router: Router = Router();

// Create a new project
router.post('/projects', authenticateJWT, ProjectController.createProject);
// Get all projects
router.get('/projects', authenticateJWT, ProjectController.getProjects);
// Get a project, lanes and cards
router.get('/projects/:project_id', authenticateJWT, ProjectController.getProjectByProjectId);
// Update project detail ex. project name, favorite
router.patch('/projects/:project_id', authenticateJWT, ProjectController.updateProject);
// Update project active status
router.patch('/projects/:project_id/active', authenticateJWT, ProjectController.updateProjectActive);

export default router;
