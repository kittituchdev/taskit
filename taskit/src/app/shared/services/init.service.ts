import { Injectable } from '@angular/core';
import { NavbarService } from './navbar.service';
import { ApiService } from '../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(
    private navbarService: NavbarService,
    private apiService: ApiService
  ) { }

  async initialData() {
    this.navbarService.setProject(await this.getProjects());
  }

  async getProjects() {
    try {
      const result = await firstValueFrom(this.apiService.getProjects());
      if (result.status === 'success') {
        return result.data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Can not get projects', error);
      return [];
    }
  }

}
