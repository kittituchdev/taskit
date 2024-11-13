import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private open = true;

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
