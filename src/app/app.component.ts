import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {

  constructor(private socketService: SocketService) {

  }

  ngOnInit(): void {
    this.socketService.listen('test').subscribe(
      res => {
        console.log(res);
      }
    )
  }
}