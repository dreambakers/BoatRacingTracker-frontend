import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  createRace(race) {
    return this.http.post(`${constants.apiUrl}/race/create/`, race);
  }

  getRaces() {
    return this.http.get(`${constants.apiUrl}/race/`);
  }
}