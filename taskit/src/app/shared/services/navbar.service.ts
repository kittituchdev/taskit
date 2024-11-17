import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private open = true;

  projects: any[] = [
    {
      projectId: 'p1',
      name: 'Next Gen CRM',
      path: '/project/'
    },
    {
      projectId: 'p2',
      name: 'WMS System',
      path: ''
    },
  ];


  constructor() { }

  getOpenStatus() {
    return this.open;
  }

  toggle() {
    this.open = !this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

}
