import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical, faListCheck, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../shared/services/util.service';
import { ApiService } from '../../core/services/api.service';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    FontAwesomeModule
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit {

  @Input() lanes: any[] = [];
  @Input() cards: any[] = [];

  faEllipsisVertical = faEllipsisVertical;
  faListCheck = faListCheck;
  faCircle = faCircle;
  faPlus = faPlus;

  connectedLanes: any[] = [];

  isDraggable = true;

  isLoading = true;

  constructor(
    protected utilService: UtilService,
    private apiService: ApiService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.connectedLanes = this.lanes.map(lane => lane.laneId);
    this.isLoading = true;
    setTimeout(() => {
      console.log('set loaded')
      this.isLoading = false;
    }, 100)
  }


  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isDraggable = window.innerWidth >= 1280; // Tailwind md breakpoint (768px)
  }

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

  openCardDetail(cardId: string) {

  }

  openCardOption(cardId: string) {

  }

}
