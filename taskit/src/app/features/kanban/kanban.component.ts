import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faListCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {

  faEllipsisVertical = faEllipsisVertical;
  faListCheck = faListCheck;

  lanes = [
    {
      laneId: 'l1',
      name: 'To do',
      order: 0
    },
    {
      laneId: 'l2',
      name: 'Doing',
      order: 1
    },
    {
      laneId: 'l3',
      name: 'Deploy',
      order: 2
    },
    {
      laneId: 'l4',
      name: 'Done',
      order: 3
    }
  ]

  constructor() { }


}
