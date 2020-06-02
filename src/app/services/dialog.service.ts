import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupRaceComponent } from '../dialogs/setup-race/setup-race.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { EndRaceComponent } from '../dialogs/end-race/end-race.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  confirm(title, message): Observable<any> {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      minWidth: "400px",
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  setupRace(): Observable<any> {
    const dialogRef = this.dialog.open(SetupRaceComponent, {
      minWidth: "400px",
    });
    return dialogRef.afterClosed();
  }

  setupLeg(parent): Observable<any> {
    const dialogRef = this.dialog.open(SetupRaceComponent, {
      minWidth: "400px",
      data: { parent }
    });
    return dialogRef.afterClosed();
  }

  endRace(): Observable<any> {
    const dialogRef = this.dialog.open(EndRaceComponent, {
      minWidth: "400px",
    });
    return dialogRef.afterClosed();
  }

}
