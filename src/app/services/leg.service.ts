import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LegService {

  constructor(private http: HttpClient) { }

  create(parentId, leg) {
    return this.http.post(`${constants.apiUrl}/leg/${parentId}`, leg);
  }

  stop(legId, body) {
    return this.http.post(`${constants.apiUrl}/leg/stop/${legId}`, body);
  }

}
