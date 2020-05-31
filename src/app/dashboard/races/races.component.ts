import { Component, OnInit } from '@angular/core';
import { RaceService } from 'src/app/services/race.service';
import { SocketService } from 'src/app/services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import { UtilService } from 'src/app/services/util.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { constants } from 'src/app/app.constants';
import * as moment from 'moment';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {

  constants = constants;
  races = [];
  show = true;
  selectedRace;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private raceService: RaceService,
    private socketSerice: SocketService,
    private mapsAPILoader: MapsAPILoader,
    private utilService: UtilService,
    private emitterService: EmitterService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {

    this.socketSerice.listen('update').pipe(takeUntil(this.destroy$)).subscribe((race: any) => {
      const updatedRace = race;
      updatedRace.contestants.forEach(
        contestant => {
          this.calculateDistance(contestant);
        }
      );
      const raceToUpdateIndex = this.races.findIndex(_race => _race._id === updatedRace._id);
      this.races[raceToUpdateIndex] = updatedRace;
      if (this.selectedRace._id === updatedRace._id) {
        this.selectedRace = updatedRace;
      }
    });

    this.emitterService.emitter.pipe(takeUntil(this.destroy$)).subscribe((emittedEvent) => {
      switch (emittedEvent.event) {
        case this.constants.emitterKeys.raceSetup:
          this.races.push(emittedEvent.data);
          return this.selectedRace = this.races[this.races.length - 1];
      }
    });

    this.raceService.getRaces().subscribe(
      (res: any) => {
        if (res.success) {
          this.races = res.races;
          this.selectedRace = this.races[0];
          this.mapsAPILoader.load().then(() => {
            this.races.forEach(
              race => {
                race.contestants.forEach(
                  contestant => {
                    this.calculateDistance(contestant);
                  }
                );
              }
            );
          });
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
    let distance = 0;
    let currentPoint;
    for (let i = 0; i < contestant.locationHistory.length; i ++) {
      if (currentPoint) {
        const nextPoint = new google.maps.LatLng(contestant.locationHistory[i].lat, contestant.locationHistory[i].lng);
        distance += google.maps.geometry.spherical.computeDistanceBetween(currentPoint, nextPoint);
        currentPoint = nextPoint;
      } else {
        currentPoint = new google.maps.LatLng(contestant.locationHistory[i].lat, contestant.locationHistory[i].lng);
      }
    }
    distance = + (distance / 1000).toFixed(2);
    contestant['distance'] = distance;
  }

  selectRace(race) {
    if (this.selectedRace._id !== race._id) {
      this.show = false;
      this.selectedRace = race;
      setTimeout(() => {
        this.show = true;
      }, 1);
    }
    if (race.legs?.length) {
      this.toggleExpansion(race);
    }
  }

  getParsedDate(date) {
    if (date) {
      return moment(date).format('YYYY-MM-DD, HH:mm')
    }
    return '-'
  }

  startRace(race) {
    this.dialogService.confirm(
      'Are you sure?',
      'This will start the selected race'
    ).subscribe(
      res => {
        if (res) {
          this.raceService.start(race._id).subscribe(
            (res: any) => {
              if (res.success) {
                const selectedRaceIndex = this.races.findIndex(_race => _race._id === race._id);
                this.races[selectedRaceIndex] = res.race;
                this.selectedRace = this.races[selectedRaceIndex];
                return this.utilService.openSnackBar('Race started.');
              }
              this.utilService.openSnackBar('An error occurred while starting the race.');
            },
            err => {
              this.utilService.openSnackBar('An error occurred while starting the race.');
            }
          );
        }
      }
    );
  }

  stopRace(race) {
    this.dialogService.confirm(
      'Are you sure?',
      'This will stop the selected race'
    ).subscribe(
      res => {
        if (res) {
          this.raceService.stop(race._id).subscribe(
            (res: any) => {
              if (res.success) {
                const selectedRaceIndex = this.races.findIndex(_race => _race._id === race._id);
                this.races[selectedRaceIndex] = res.race;
                this.selectedRace = this.races[selectedRaceIndex];
                return this.utilService.openSnackBar('Race stopped.');
              }
              this.utilService.openSnackBar('An error occurred while stopping the race.');
            },
            err => {
              this.utilService.openSnackBar('An error occurred while stopping the race.');
            }
          );
        }
      }
    );
  }

  deleteRace(race) {
    this.dialogService.confirm(
      'Are you sure?',
      'This will delete the selected race'
    ).subscribe(
      res => {
        if (res) {
          this.raceService.delete(race._id).subscribe(
            (res: any) => {
              if (res.success) {
                this.races = this.races.filter(_race => _race._id !== race._id);
                this.selectedRace = this.races[0];
                return this.utilService.openSnackBar('Race deleted.');
              }
              this.utilService.openSnackBar('An error occurred while deleting the race.');
            },
            err => {
              this.utilService.openSnackBar('An error occurred while deleting the race.');
            }
          );
        }
      }
    );
  }

  getSortedContestants() {
    if (this.selectedRace) {
      this.selectedRace.contestants.sort((a, b) => {
        return b.distance - a.distance;
      });
      return this.selectedRace.contestants;
    }
  }

  get canRemove() {
    if (this.selectedRace) {
      return [
        constants.raceStatus.finished,
        constants.raceStatus.waiting
      ].includes(this.selectedRace.status);
    }
    return false;
  }

  get canStop() {
    if (this.selectedRace) {
      return this.selectedRace.status === this.constants.raceStatus.inProgress;
    }
    return false;
  }

  get canStart() {
    if (this.selectedRace) {
      return this.selectedRace.status === this.constants.raceStatus.waiting && this.selectedRace.contestants.length;
    }
    return false;
  }

  get filteredRaces() {
    return this.races.filter(
      race => !race.legOf
    );
  }

  toggleExpansion(race) {
    race['expanded'] = !race['expanded'];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

}
