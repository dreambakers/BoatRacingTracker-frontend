import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

   // google maps zoom level
   zoom: number = 1;
   flightPlanCoordinates = [
     {lat: 37.772, lng: -122.214},
     {lat: 21.291, lng: -157.821},
     {lat: -18.142, lng: 178.431},
     {lat: -27.467, lng: 153.027}
   ];


   ngOnInit(): void {
     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
     //Add 'implements OnInit' to the class.

     // setInterval(
     //   () => {
     //     this.flightPlanCoordinates.push(
     //       {
     //         lat: this.flightPlanCoordinates[this.flightPlanCoordinates.length - 1].lat + 20,
     //         lng: this.flightPlanCoordinates[this.flightPlanCoordinates.length - 1].lng + 20
     //       }
     //     );
     //   }, 5000);
   }

   // initial center position for the map
   lat: number = 51.673858;
   lng: number = 7.815982;

 }

 // just an interface for type safety.
 interface marker {
   lat: number;
   lng: number;
   label?: string;
   draggable: boolean;
 }
