import { Component, OnInit } from '@angular/core';
import { KanbanComponent } from '../kanban/kanban.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../core/services/api.service';

interface ILane {
  laneId: string,
  name: string,
  color: string
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    KanbanComponent,
    FontAwesomeModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  faChartSimple = faChartSimple;
  faFilter = faFilter;

  isLoading = true;
  errorMessage = '';

  project = {
    projectId: '34d03524-88c1-4520-8d45-75883871d77b',
    name: 'Task Management System'
  }


  lanes: ILane[] = [
    { laneId: 'l1', name: 'Backlog', color: '#dcdde1' },
    { laneId: 'l2', name: 'To Do', color: '#f4d03f' },
    { laneId: 'l3', name: 'In Progress', color: '#5dade2' },
    { laneId: 'l4', name: 'Code Review', color: '#f39c12' },
    { laneId: 'l5', name: 'Testing', color: '#e67e22' },
    { laneId: 'l6', name: 'Done', color: '#58d68d' },
    { laneId: 'l7', name: 'Production', color: '#2ecc71' }
  ];

  cards: any = {
    l1: [
      { cardId: 1, name: 'Feature Request Analysis', description: 'Analyze new feature requests', progress: '0/1' },
      { cardId: 2, name: 'Tech Debt Assessment', description: 'Identify areas of technical debt', progress: '0/1' },
      { cardId: 3, name: 'Gather Requirements for Project X', description: 'Interview stakeholders', progress: '0/1' }
    ],
    l2: [
      { cardId: 4, name: 'Implement Login API', description: 'Develop login API with JWT authentication', progress: '0/1', label: 'Backend', labelColor: '#aed6f1', textColor: '#21618c' },
      { cardId: 5, name: 'Design Landing Page', description: 'Create wireframes for landing page', progress: '0/1' },
      { cardId: 6, name: 'Setup Database Schema', description: 'Design tables for user data', progress: '0/1', label: 'Database', labelColor: '#d7bde2', textColor: '#6c3483' },
      // { cardId: 7, name: 'Define User Roles', description: 'Define permissions for each role', progress: '0/1' }
    ],
    l3: [
      { cardId: 8, name: 'Build UI for User Dashboard', description: 'Create components for the user dashboard', progress: '1/4', label: 'Frontend', labelColor: '#f9e79f', textColor: '#b9770e' },
      { cardId: 9, name: 'Integrate Payment Gateway', description: 'Connect with payment API', progress: '2/5', label: 'Backend', labelColor: '#aed6f1', textColor: '#21618c' },
      { cardId: 10, name: 'Build Profile Management', description: 'Create profile editing features', progress: '1/3', label: 'Frontend', labelColor: '#f9e79f', textColor: '#b9770e' },
      { cardId: 11, name: 'Email Notification System', description: 'Setup automated emails', progress: '1/2', label: 'Backend', labelColor: '#aed6f1', textColor: '#21618c' }
    ],
    l4: [
      { cardId: 12, name: 'Code Review for Login API', description: 'Review code and ensure best practices', progress: '0/1', label: 'Review', labelColor: '#f7dc6f', textColor: '#b7950b' },
      { cardId: 13, name: 'Code Review for Dashboard UI', description: 'Check UI components for errors', progress: '0/1', label: 'Review', labelColor: '#f7dc6f', textColor: '#b7950b' },
      { cardId: 14, name: 'Review Payment Integration', description: 'Check API integration and errors', progress: '0/1', label: 'Review', labelColor: '#f7dc6f', textColor: '#b7950b' }
    ],
    l5: [
      { cardId: 15, name: 'UI Testing for Dashboard', description: 'Run unit and integration tests', progress: '2/3', label: 'Testing', labelColor: '#f5cba7', textColor: '#935116' },
      { cardId: 16, name: 'API Load Testing', description: 'Test performance under heavy load', progress: '1/2', label: 'Testing', labelColor: '#f5cba7', textColor: '#935116' },
      { cardId: 17, name: 'End-to-End Testing', description: 'Run full workflow tests', progress: '0/1', label: 'Testing', labelColor: '#f5cba7', textColor: '#935116' }
    ],
    l6: [
      { cardId: 18, name: 'Deploy to Staging', description: 'Deploy new features to the staging environment', progress: '1/1', label: 'Deployment', labelColor: '#a3e4d7', textColor: '#148f77' },
      { cardId: 19, name: 'Verify Staging Environment', description: 'Ensure all features work on staging', progress: '1/1', label: 'Verification', labelColor: '#abebc6', textColor: '#1d8348' }
    ],
    l7: [
      { cardId: 20, name: 'Go Live', description: 'Push final changes to production', progress: '0/1', label: 'Release', labelColor: '#abebc6', textColor: '#1d8348' },
      { cardId: 21, name: 'Monitor Production Logs', description: 'Monitor for any live issues', progress: '0/1', label: 'Maintenance', labelColor: '#aab7b8', textColor: '#34495e' }
    ]
  };


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.fetchLanes();
  }

  fetchLanes() {
    this.apiService.getLanes(this.project.projectId).subscribe({
      next: (result) => {
        if (result.status?.toLowerCase() === 'success') {
          this.lanes = this.formatLaneData(result.data);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  formatLaneData(laneResult: [] = []): ILane[] {
    let result: ILane[] = [];
    if (Array.isArray(laneResult)) {
      result = laneResult.map(lane => {
        return {
          laneId: lane['lane_id'],
          name: lane['name'],
          color: lane['color'] ?? '#0ea5e9'
        } as ILane;
      });
      return result;
    } else {
      console.error('Lane result invalid format', laneResult)
      return result;
    }
  }

}
