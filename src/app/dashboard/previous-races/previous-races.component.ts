import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-races',
  templateUrl: './previous-races.component.html',
  styleUrls: ['./previous-races.component.scss']
})
export class PreviousRacesComponent implements OnInit {

  items = [];

  constructor() { }

  ngOnInit(): void {
    for (let index = 0; index < 100; index++) {
      this.items.push('')

    }
  }

}
