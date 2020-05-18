import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/services/race.service';

@Component({
  selector: 'app-live-race',
  templateUrl: './live-race.component.html',
  styleUrls: ['./live-race.component.scss']
})
export class LiveRaceComponent implements OnInit {

  items = [];

  races = [];

  constructor(private raceService: RaceService) { }

  ngOnInit(): void {

    this.raceService.getRaces().subscribe(
      (res: any) => {
        if (res.success) {
          this.races = res.races;
        } else {
          console.log('error getting races');
        }
      },
      err => {
        console.log('error getting races');
      }
    );
  }

}