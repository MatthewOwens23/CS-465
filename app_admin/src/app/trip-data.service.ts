import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/trips');
  }

  addTrip(formData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/trips', formData);
  }

  getTrip(tripCode: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/trips/' + tripCode);
  }

  updateTrip(formData: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + '/trips/' + formData.code,
      formData
    );
  }
}