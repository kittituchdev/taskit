import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faListCheck, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../shared/services/util.service';
import { ApiService } from '../../core/services/api.service';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    FontAwesomeModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit {

  @Input() lanes: any[] = [];
  @Input() cards: any[] = [];
  @Input() laneChangeCallback: Function = () => { };

  @ViewChild('laneName')
  laneName!: ElementRef;

  faEllipsis = faEllipsis;
  faListCheck = faListCheck;
  faCircle = faCircle;
  faPlus = faPlus;


  connectedLanes: any[] = [];

  laneNameInput: string | null = null;
  laneNameChange = new FormControl('', Validators.required);

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

  openChangeLaneNameInput(laneId: string, defaultLaneName?: string) {
    this.laneNameInput = laneId;
    setTimeout(() => {
      this.laneNameChange.setValue(defaultLaneName ?? '')
      this.laneName.nativeElement.select()
    });
  }

  saveLaneName() {
    if (this.laneNameInput) {
      if (this.laneNameChange.valid) {
        const updateObject = {
          name: this.laneNameChange.value
        }
        // call api update lane name
        this.apiService.updateLane(this.laneNameInput, updateObject).subscribe({
          next: (result) => {
            this.laneChangeCallback().then(() => {
              this.laneNameInput = null;
            })
          },
          error: (error) => {
            console.log(error)
            this.laneNameInput = null;
          }
        })
      } else {
        this.laneNameInput = null;
      }
    }

  }

}
