import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  createRace(race) {
    return this.http.post(`${constants.apiUrl}/race/create/`, race);
  }

  start(raceId) {
    return this.http.post(`${constants.apiUrl}/race/start/${raceId}`, {});
  }

  stop(raceId, body) {
    return this.http.post(`${constants.apiUrl}/race/stop/${raceId}`, body);
  }

  delete(raceId) {
    return this.http.post(`${constants.apiUrl}/race/delete/${raceId}`, {});
  }

  getRaces() {
    return this.http.get(`${constants.apiUrl}/race/`);
  }
}