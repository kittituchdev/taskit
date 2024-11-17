import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface IProject {
  projectId: string,
  name: string,
  path: string
}
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private open = true;

  projects: IProject[] = [];


  constructor() { }

  getOpenStatus() {
    return this.open;
  }

  toggle() {
    this.open = !this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  setProject(projects: any[]) {
    this.projects = projects.map((project) => {
      return {
        projectId: project['project_id'],
        name: project['name'],
        path: `/project/${project['project_id']}`
      } as IProject;
    });
  }

}
