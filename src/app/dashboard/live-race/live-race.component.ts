import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-race',
  templateUrl: './live-race.component.html',
  styleUrls: ['./live-race.component.scss']
})
export class LiveRaceComponent implements OnInit {

  items = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 100; index++) {
      this.items.push('')

    }
  }

}