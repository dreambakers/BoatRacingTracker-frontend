import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constants = constants;
  socket: any;
  uri = `ws://${this.constants.apiUrl.split('//')[1]}`

  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName: String) {
    return new Observable(
      subscriber => {
        this.socket.on(
          eventName, (data) => {
            subscriber.next(data);
          }
        );
      }
    );
  }

  emit(eventName: String, data: any) {
    this.socket.emit(eventName, data);
  }

}
