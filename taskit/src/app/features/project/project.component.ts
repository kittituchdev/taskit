import { Component, OnInit } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

interface ILane {
  laneId: string,
  name: string,
  color?: string
}

interface IProject {
  projectId: string,
  name: string
}

interface ICard {
  cardId: string,
  title: string,
  description?: string

}
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    KanbanComponent,
    FontAwesomeModule,
    LoaderComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  faChartSimple = faChartSimple;
  faFilter = faFilter;

  isLaneLoading = true;
  isProjectLoading = true;
  isCardLoading = true;

  errorMessage = '';

  project: IProject = {
    projectId: '',
    name: ''
  }

  lanes: ILane[] = [];

  cards: any = {};


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Listen to route parameters to get the projectId
    this.route.paramMap.subscribe((params) => {
      const projectId = params.get('projectId'); // Get the 'id' from the route parameter
      this.lanes = [];
      if (projectId) {
        this.isLaneLoading = true;
        this.isProjectLoading = true;
        this.isCardLoading = true;
        this.project.projectId = projectId;
        this.fetchProject();
        this.fetchLanes().then(() => {
          if (this.lanes.length > 0) { // get cards
            this.fetchCardsLoop();
          }
        })
      }
    });
  }

  async fetchCardsLoop() {
    this.cards = {};
    for (const lane of this.lanes) {
      this.cards[lane.laneId] = await this.fetchCards(lane.laneId);
    }
    this.isCardLoading = false;
  }

  fetchCards(laneId: string): Promise<ICard[]> {
    return new Promise((resolve, reject) => {
      let cardsResult: ICard[] = [];
      this.apiService.getCards(laneId).subscribe({
        next: (result) => {
          if (result.status?.toLowerCase() === 'success') {
            cardsResult = this.formatCardData(result.data);
          }
          resolve(cardsResult);
          this.isLaneLoading = false;
        },
        error: (error) => {
          console.error('Error fetching projects:', error.message);
          this.errorMessage = 'Failed to load projects. Please try again later.';
          resolve(cardsResult);
          this.isLaneLoading = false;
        }
      });
    })
  }

  async fetchLanes() {
    return new Promise((resolve, reject) => {
      this.apiService.getLanes(this.project.projectId).subscribe({
        next: (result) => {
          if (result.status?.toLowerCase() === 'success') {
            this.lanes = this.formatLaneData(result.data);
          }
          resolve(true);
          this.isLaneLoading = false;
        },
        error: (error) => {
          console.error('Error fetching lanes:', error.message);
          this.errorMessage = 'Failed to load lanes. Please try again later.';
          reject(error);
          this.isLaneLoading = false;
        }
      });
    })
  }

  fetchProject() {
    this.apiService.getProject(this.project.projectId).subscribe({
      next: (result) => {
        if (result.status?.toLowerCase() === 'success') {
          this.project = this.formatProjectData(result.data);
        }
        this.isLaneLoading = false;
      },
      error: (error) => {
        console.error('Error fetching projects:', error.message);
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.isLaneLoading = false;
      }
    });


    this.isProjectLoading = false;
  }

  formatLaneData(laneResult: [] = []): ILane[] {
    let result: ILane[] = [];
    if (Array.isArray(laneResult)) {
      result = laneResult.map(lane => {
        return {
          laneId: lane['lane_id'],
          name: lane['name']
        } as ILane;
      });
      return result;
    } else {
      console.error('Lane result invalid format', laneResult)
      return result;
    }
  }

  formatProjectData(projectResult: any = {}): IProject {
    return {
      projectId: projectResult['project_id'] ?? '',
      name: projectResult['name'] ?? ''
    }
  }

  formatCardData(cardsResult: [] = []) {
    let result: ICard[] = [];
    if (Array.isArray(cardsResult)) {
      result = cardsResult.map(card => {
        return {
          cardId: card['card_id'],
          title: card['title'],
          description: card['description']
        } as ICard;
      });
      return result;
    } else {
      console.error('Lane result invalid format', cardsResult)
      return result;
    }
  }

  public laneChangeCallback = async () => {
    return new Promise((resolve) => {
      this.fetchLanes().then(() => {
        resolve(true)
      }).catch(error => {
        console.error(error)
        resolve(false)
      })
    })
  }

  public cardChangeCallback = async (laneId: string) => {
    return new Promise(async (resolve) => {
      this.cards[laneId] = await this.fetchCards(laneId);
      resolve(true)
    })
  }

}
