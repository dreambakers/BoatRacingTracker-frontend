import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupRaceComponent } from '../dialogs/setup-race/setup-race.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  setupRace(): Observable<any> {
    const dialogRef = this.dialog.open(SetupRaceComponent, {
      minWidth: "400px",
    });
    return dialogRef.afterClosed();
  }

}
