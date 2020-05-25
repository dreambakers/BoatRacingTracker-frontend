import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RaceService } from 'src/app/services/race.service';
import { UtilService } from 'src/app/services/util.service';
import { EmitterService } from 'src/app/services/emitter.service';
import { constants } from 'src/app/app.constants';

@Component({
  selector: 'app-setup-race',
  templateUrl: './setup-race.component.html',
  styleUrls: ['./setup-race.component.scss']
})
export class SetupRaceComponent implements OnInit {

  constants = constants;
  raceForm: FormGroup;
  submitted = false;

  @ViewChild('f') form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SetupRaceComponent>,
    private raceService: RaceService,
    private utilService: UtilService,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    this.raceForm = this.formBuilder.group({
      raceName: ['', [Validators.required]],
      laps: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(1)]],
    });
  }

  get f() { return this.raceForm.controls; }

  create() {
    this.submitted = true;

    if (this.raceForm.invalid) {
      return;
    }

    const newRace = {
      name: this.raceForm.value.raceName,
      laps: this.raceForm.value.laps,
    }

    this.raceService.createRace(newRace).subscribe(
      (res : any) => {
        if (res.success) {
          this.utilService.openSnackBar('Race setup successful!');
          this.emitterService.emit(this.constants.emitterKeys.raceSetup, res.race);
          return this.onDismiss();
        }
        this.utilService.openSnackBar('Race setup failed. Check the enteries and try again.');
      }, err => {
        this.utilService.openSnackBar('An error occurred while setting up the race!');
      }
    );
  }


  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
