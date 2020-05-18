import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/services/race.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-previous-races',
  templateUrl: './previous-races.component.html',
  styleUrls: ['./previous-races.component.scss']
})
export class PreviousRacesComponent implements OnInit {

  races = [];
  selectedRace;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private raceService: RaceService,
    private socketSerice: SocketService
  ) { }

  ngOnInit(): void {

    this.socketSerice.listen('update').pipe(takeUntil(this.destroy$)).subscribe((race: any) => {
      if (this.selectedRace._id === race._id) {
        this.selectedRace = race;
      }
    });

    this.raceService.getRaces().subscribe(
      (res: any) => {
        if (res.success) {
          this.races = res.races;
          this.selectedRace = this.races[0];
        } else {
          console.log('error getting races');
        }
      },
      err => {
        console.log('error getting races');
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
