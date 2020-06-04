import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { EmitterService } from '../services/emitter.service';
import { takeUntil } from 'rxjs/operators';
import { constants } from '../app.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom: number = 16;
  // initial center position for the map
  lat: number = 0;
  lng: number = 0;
  @Input() race;
  constants = constants;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private emitterService: EmitterService
  ) {}

  ngOnInit(): void {
    if (this.race && this.race.contestants.length) {
      this.lat = this.race.contestants[0].locationHistory[this.race.contestants[0].locationHistory.length - 1].lat;
      this.lng = this.race.contestants[0].locationHistory[this.race.contestants[0].locationHistory.length - 1].lng;
    }

    this.race.contestants.forEach(contestant => {
      contestant['symbol'] = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor: 'black',
        rotation: 0,
        scale: 2,
        fillOpacity: 1
      }
    });

    this.emitterService.emitter.pipe(takeUntil(this.destroy$)).subscribe((emittedEvent) => {
      switch (emittedEvent.event) {
        case this.constants.emitterKeys.contestantSelected:
          return this.panToContestant(emittedEvent.data);
      }
    });
  }

  getSymbolForContestant(contestant) {
    let rotationAngle = 0;
    if (contestant.locationHistory.length >= 2) {
      const totalPoints = contestant.locationHistory.length;
      const prevPoint = new google.maps.LatLng(contestant.locationHistory[totalPoints - 2].lat, contestant.locationHistory[totalPoints - 2].lng);
      const currentPoint = new google.maps.LatLng(contestant.locationHistory[totalPoints - 1].lat, contestant.locationHistory[totalPoints - 1].lng);
      rotationAngle = google.maps.geometry.spherical.computeHeading(prevPoint, currentPoint);
    }
    contestant.symbol.rotation = rotationAngle;
    return contestant.symbol;
  }

  panToContestant(contestant) {
    if (contestant?.locationHistory?.length) {
      this.lat = contestant.locationHistory[contestant.locationHistory.length - 1].lat;
      this.lng = contestant.locationHistory[contestant.locationHistory.length - 1].lng;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label ? : string;
  draggable: boolean;
}
