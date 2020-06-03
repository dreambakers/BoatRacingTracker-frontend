import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-race',
  templateUrl: './end-race.component.html',
  styleUrls: ['./end-race.component.scss']
})
export class EndRaceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EndRaceComponent>) {
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  dismiss() {
    this.dialogRef.close();
  }

  onEndRace(): void {
    this.dialogRef.close({ decision: { allowLegCreation: false } });
  }

  onEndLeg(): void {
    this.dialogRef.close({ decision: { allowLegCreation: true } });
  }
}