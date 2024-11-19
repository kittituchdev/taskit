import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private exampleApiUrl = 'https://example.com/api'; // Example Base URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Example of a GET request
  getItems(): Observable<any> {
    return this.http.get(`${this.exampleApiUrl}/items`);
  }

  // Example of a POST request
  createItem(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.exampleApiUrl}/items`, data, { headers });
  }

  // Example of a PUT request
  updateItem(id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.exampleApiUrl}/items/${id}`, data, { headers });
  }

  // Example of a DELETE request
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.exampleApiUrl}/items/${id}`);
  }

  // Main request

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects`);
  }

  getProject(projectId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects/${projectId}`);
  }

  getLanes(projectId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/projects/${projectId}/lanes`);
  }

  getCards(laneId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lanes/${laneId}/cards`);
  }

}
