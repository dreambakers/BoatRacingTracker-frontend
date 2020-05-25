import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/services/race.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

  races = [];
  selectedRace;
  mapsLoaded = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private raceService: RaceService,
    private socketSerice: SocketService,
    private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.mapsLoaded = true;
    });

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
          // for(let i = 0; i < 100; i ++) {
          //   this.races.push(this.races[0])
          //   this.selectedRace.contestants.push(this.selectedRace.contestants[0])
          // }

        } else {
          this.utilService.openSnackBar('Error getting races.');
        }
      },
      err => {
        this.utilService.openSnackBar('Error getting races.');
      }
    );
  }

  calculateDistance(contestant) {
    if (this.mapsLoaded) {
      let distance = 0;
      for (let i = 0; i < contestant.locationHistory.length - 2; i ++) {
        const point1 = new google.maps.LatLng(contestant.locationHistory[i].lat, contestant.locationHistory[i].lng);
        const point2 = new google.maps.LatLng(contestant.locationHistory[i + 1].lat, contestant.locationHistory[i + 1].lng);
        distance += google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
      }
      return (distance / 1000).toFixed(2);
    }
  }

  selectRace(race) {
    this.selectedRace = race;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
