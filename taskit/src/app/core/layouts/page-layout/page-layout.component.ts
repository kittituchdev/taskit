import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { InitService } from '../../../shared/services/init.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    LoaderComponent
  ],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css'
})
export class PageLayoutComponent implements OnInit {

  isLoading = true;

  constructor(
    private initService: InitService
  ) { }

  ngOnInit(): void {
    this.initService.initialData().then(() => {
      setTimeout(() => { // for loading animation
        this.isLoading = false;
      }, 1000);
    })
  }
}
