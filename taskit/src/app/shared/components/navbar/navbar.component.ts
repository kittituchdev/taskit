import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFolder, faEllipsisVertical, faChartPie, faGear, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  faXmark = faXmark;
  faFolder = faFolder;
  faEllipsisVertical = faEllipsisVertical;
  faChartPie = faChartPie;
  faGear = faGear;
  faUser = faUser;
  faCircle = faCircle;

  smallScreen = false;

  currentProjectId: string | null = null;

  constructor(
    protected navbarService: NavbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkScreenSize()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const match = url.match(/\/project\/(.+)/);
        this.currentProjectId = match ? match[1] : null;
      }
    })
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth < 768) {
      this.navbarService.setOpen(false);
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  goToProject(project: any): void {
    this.router.navigate(['/project', project.projectId]);
  }

  isActive(projectId: string): boolean {
    return this.currentProjectId === projectId;
  }

}
