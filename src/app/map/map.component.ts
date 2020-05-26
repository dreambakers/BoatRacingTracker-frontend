import {
  Component,
  OnInit,
  Input
} from '@angular/core';

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


  ngOnInit(): void {
    if (this.race && this.race.contestants.length) {
      this.lat = this.race.contestants[0].locationHistory[this.race.contestants[0].locationHistory.length - 1].lat;
      this.lng = this.race.contestants[0].locationHistory[this.race.contestants[0].locationHistory.length - 1].lng;
    }
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label ? : string;
  draggable: boolean;
}
