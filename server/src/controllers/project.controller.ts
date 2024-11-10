import { Request, Response } from 'express';
import Project from '../models/project.model';
import { uuid } from '../utils/uuid.utils';

class ProjectController {

  // Create a new project
  public async createProject(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const body = req.body as {
        name: string
      };
      const createObject = {
        project_id: uuid(),
        name: body.name,
        created: {
          by: userId,
          date: Date.now()
        },
        updated: {
          by: userId,
          date: Date.now()
        }
      }
      const newProject = new Project(createObject);
      const project = await newProject.save();
      return res.status(201).json({
        status: 'success',
        data: project
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error creating project'
      });
    }
  }


  // Get all projects
  public async getProjects(req: Request, res: Response): Promise<any> {
    try {
      const projects = await Project.find();
      return res.status(200).json({
        status: 'success',
        data: projects
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error fetching projects'
      });
    }
  }

  // Get a project, lanes and cards
  public async getProjectByProjectId(req: Request, res: Response): Promise<any> {
    try {
      const projectId = req.params?.project_id;
      if (!projectId) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const project = await Project.findOne({ project_id: projectId });
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: project
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error fetching project'
      });
    }
  }

  // Update project detail ex. project name, favorite
  public async updateProject(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.user_id || 'system';
      const projectId = req.params?.project_id;
      const body = req.body as {
        name: string,
        favorite: boolean
      }
      if (!projectId) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      let updateObject: any = {
        updated: {
          by: userId,
          date: Date.now()
        }
      };
      if (body.name !== undefined) updateObject.name = body.name;
      if (body.favorite !== undefined) updateObject.favorite = body.favorite;
      if (body.name === undefined && body.favorite === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const project = await Project.findOneAndUpdate({ project_id: projectId }, updateObject, { new: true });
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: project
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error updating project'
      });
    }
  }

  // Update project active status
  public async updateProjectActive(req: Request, res: Response): Promise<any> {
    try {
      const projectId = req.params?.project_id;
      const active = req.body?.active
      if (!projectId || active === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid parameters'
        });
      }
      const project = await Project.findOneAndUpdate({ project_id: projectId }, { active }, { new: true });
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          data: project
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error updating project'
      });
    }
  }

}

export default new ProjectController();
