import { Component, OnInit, Input } from '@angular/core';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-race-status',
  templateUrl: './race-status.component.html',
  styleUrls: ['./race-status.component.scss']
})
export class RaceStatusComponent implements OnInit {

  constants = constants;
  @Input() race;

  constructor() { }

  ngOnInit(): void {
  }

  getRaceStatus() {
    if (this.race) {
      switch (this.race.status) {
        case this.constants.raceStatus.waiting:
          return 'Waiting'
        case this.constants.raceStatus.inProgress:
          return 'In progress'
        case this.constants.raceStatus.finished:
          return 'Finished'
      }
    }
  }

}
