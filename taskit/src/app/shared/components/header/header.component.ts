import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faBars = faBars;

  constructor(
    protected navbarService: NavbarService
  ) { }

}
