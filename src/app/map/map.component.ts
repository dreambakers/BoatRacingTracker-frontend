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
  lat: number = 33.662791;
  lng: number = 72.992535;

  flightPlanCoordinates = [{
    lat: 33.663266,
    lng: 72.992237
  }, {
    lat: 33.662997,
    lng: 72.991787
  }, {
    lat: 33.662827,
    lng: 72.991851
  }, {
    lat: 33.662625,
    lng: 72.992017
  }, {
    lat: 33.662250,
    lng: 72.992344
  }, {
    lat: 33.662272,
    lng: 72.992545
  }, {
    lat: 33.662384,
    lng: 72.992835
  }, {
    lat: 33.662545,
    lng: 72.993138
  }, {
    lat: 33.662795,
    lng: 72.993320
  }, {
    lat: 33.662971,
    lng: 72.993202
  }, {
    lat: 33.663243,
    lng: 72.992993
  }, {
    lat: 33.663448,
    lng: 72.992843
  }, {
    lat: 33.663432,
    lng: 72.992569
  }, {
    lat: 33.663258,
    lng: 72.992244
  }, {
    lat: 33.663066,
    lng: 72.991906
  }];

  @Input() race;

  ngOnInit(): void {
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label ? : string;
  draggable: boolean;
}
