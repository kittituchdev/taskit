import { Component, HostListener, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFolder, faEllipsisVertical, faChartPie, faGear, faUser, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InitService } from '../../services/init.service';

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
export class NavbarComponent implements OnInit {

  faXmark = faXmark;
  faFolder = faFolder;
  faEllipsisVertical = faEllipsisVertical;
  faChartPie = faChartPie;
  faGear = faGear;
  faUser = faUser;
  faCircle = faCircle;

  smallScreen = false;

  currentProjectId: string | null = null;
  activeMenu: string | null = null; // Track the active menu

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
        // Set activeMenu based on current URL
        if (url.includes('dashboard')) {
          this.activeMenu = 'dashboard';
        } else if (url.includes('setting')) {
          this.activeMenu = 'setting';
        } else {
          this.activeMenu = null;
        }
      }
    })
  }

  ngOnInit(): void {
    this.initialNavbarActive();
  }

  initialNavbarActive() {
    const url = this.router.url;
    const match = url.match(/\/project\/(.+)/);
    this.currentProjectId = match ? match[1] : null;
    // Set activeMenu based on current URL
    if (url.includes('dashboard')) {
      this.activeMenu = 'dashboard';
    } else if (url.includes('setting')) {
      this.activeMenu = 'setting';
    } else {
      this.activeMenu = null;
    }
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
    this.router.navigate([project.path]);
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
    this.activeMenu = 'dashboard'; // Set active menu to 'dashboard'
  }

  goToSetting() {
    this.router.navigate(['setting']);
    this.activeMenu = 'setting'; // Set active menu to 'setting'
  }

  isActive(projectId: string | null): boolean {
    return this.currentProjectId === projectId;
  }

}
