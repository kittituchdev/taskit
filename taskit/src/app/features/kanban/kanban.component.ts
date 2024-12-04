import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faListCheck, faCircle, faPlus, faXmark, faSave } from '@fortawesome/free-solid-svg-icons';
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
  @Input() laneChangeCallback: Function = async () => { };
  @Input() cardChangeCallback: Function = async () => { };

  @ViewChild('laneName')
  laneName!: ElementRef;
  @ViewChild('newCardName')
  newCardName!: ElementRef;

  faEllipsis = faEllipsis;
  faListCheck = faListCheck;
  faCircle = faCircle;
  faPlus = faPlus;
  faXmark = faXmark;
  faSave = faSave;


  connectedLanes: any[] = [];

  laneNameInput: string | null = null;
  laneNameChange = new FormControl('', Validators.required);
  cardNameChange = new FormControl('');


  createCardConfig = {
    show: false as boolean,
    laneId: null as string | null
  };

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
      this.isLoading = false;
      console.log(this.cards)
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
    setTimeout(() => {
      this.laneNameInput = laneId;
      setTimeout(() => {
        this.laneNameChange.setValue(defaultLaneName ?? '')
        this.laneName.nativeElement.select()
      });
    }, 50);

  }

  saveLaneName() {
    if (this.laneNameInput) {
      if (this.laneNameChange.valid) {
        const updateObject = {
          name: this.laneNameChange.value
        }
        // call api update lane name
        this.apiService.updateLane(this.laneNameInput, updateObject).subscribe({
          next: (result: any) => {
            if (result.status === 'success') {
              this.laneChangeCallback().then(() => {
                this.laneNameInput = null;
              })
            } else {
              this.laneNameInput = null;
            }
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

  setCreateCardConfig(show: boolean, laneId: string) {
    console.log(laneId)
    this.createCardConfig = {
      show,
      laneId
    };
    setTimeout(() => {
      this.newCardName.nativeElement.focus()
    }, 50);
  }

  cancelCreateCard() {
    this.createCardConfig = {
      show: false,
      laneId: null
    };
  }

  addNewCard() {
    if (!this.cardNameChange.value) { // no input data, then close input without create card
      this.cancelCreateCard();
    } else {
      console.log(this.cardNameChange.value);
      if (this.createCardConfig.laneId) {
        this.apiService.createCard(this.createCardConfig.laneId, { title: this.cardNameChange.value }).subscribe({
          next: (result: any) => {
            if (result.status === 'success') {
              this.cardChangeCallback(this.createCardConfig.laneId).then(() => {
                this.cancelCreateCard();
              })
              console.log('success')
            } else {
              console.log('fail')
              this.cancelCreateCard();
            }
          },
          error: (error) => {
            console.log(error)
            console.log('fail')
            this.cancelCreateCard();
          }
        })
      }
    }
  }

}
