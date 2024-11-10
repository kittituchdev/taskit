import Project from "../models/project.model";


class ProjectService {
    public async checkProjectExists(projectId: string): Promise<boolean> {
        const project = await Project.findOne({ project_id: projectId });
        if (!project) {
            return false;
        } else {
            return true;
        }
    }
}

export default new ProjectService();
