import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private apiUrl = 'http://localhost:3000/incidents'; // adapte si ton port ou URL est différent

  constructor(private http: HttpClient) {}

  enregistrerIncident(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
