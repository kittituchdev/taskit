import { Component } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    KanbanComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

}
