import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  parent;

  @ViewChild('f') form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SetupRaceComponent>,
    private raceService: RaceService,
    private utilService: UtilService,
    private emitterService: EmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.parent = this.data?.parent;
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

    if (this.parent) {
      this.createLeg();
    } else {
      this.createRace();
    }
  }

  createLeg() {
    const newLeg = {
      name: this.raceForm.value.raceName,
      laps: this.raceForm.value.laps,
      legOf: this.parent._id
    }
    this.raceService.createLeg(this.parent._id, newLeg).subscribe(
      (res : any) => {
        if (res.success) {
          this.utilService.openSnackBar('Leg setup successful!');
          this.emitterService.emit(this.constants.emitterKeys.legSetup, { race: res.race, leg: res.leg });
          return this.onDismiss();
        }
        this.utilService.openSnackBar('Leg setup failed. Check the enteries and try again.');
      }, err => {
        this.utilService.openSnackBar('An error occurred while setting up the leg!');
      }
    );
  }

  createRace() {
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
