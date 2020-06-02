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

  createLeg(parentId, leg) {
    return this.http.post(`${constants.apiUrl}/race/createLeg/${parentId}`, leg);
  }

  start(raceId) {
    return this.http.post(`${constants.apiUrl}/race/start/${raceId}`, {});
  }

  stop(raceId, body) {
    return this.http.post(`${constants.apiUrl}/race/stop/${raceId}`, body);
  }

  stopLeg(legId, body) {
    return this.http.post(`${constants.apiUrl}/race/stopLeg/${legId}`, body);
  }

  delete(raceId) {
    return this.http.post(`${constants.apiUrl}/race/delete/${raceId}`, {});
  }

  getRaces() {
    return this.http.get(`${constants.apiUrl}/race/`);
  }
}