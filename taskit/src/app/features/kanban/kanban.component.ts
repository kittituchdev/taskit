import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDragPreview, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    DragDropModule,
    CdkDrag,
    CdkDropList,
    CdkDragPlaceholder,
    CdkDragPreview,
    FontAwesomeModule,
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {


  faEllipsisVertical = faEllipsisVertical;
  faListCheck = faListCheck;

  lanes = [
    { laneId: 'l1', name: 'To Do' },
    { laneId: 'l2', name: 'In Progress' },
    { laneId: 'l3', name: 'Done' }
  ];

  cards: any = {
    l1: [
      { cardId: 1, name: 'Task 1', description: 'Description for Task 1', progress: '1/4' },
      { cardId: 2, name: 'Task 2', description: 'Description for Task 2', progress: '2/5' }
    ],
    l2: [
      { cardId: 3, name: 'Task 3', description: 'Description for Task 3', progress: '3/4' }
    ],
    l3: [
      { cardId: 4, name: 'Task 4', description: 'Description for Task 4', progress: '4/4' }
    ]
  };

  connectedLanes = this.lanes.map(lane => lane.laneId);

  constructor() { }


  dropCard(event: CdkDragDrop<any[]>, laneId?: string): void {
    // Check if dragging within the same container
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer the item to the new container's data array
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Function to handle lane dragging and reordering
  dropLane(event: CdkDragDrop<any[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.lanes, event.previousIndex, event.currentIndex);
    }
  }

}
