import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { InitService } from '../../../shared/services/init.service';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})
export class PageLayoutComponent implements OnInit {

  constructor(
    private initService: InitService
  ) { }

  ngOnInit(): void {
    this.initService.initialData();
  }
}
