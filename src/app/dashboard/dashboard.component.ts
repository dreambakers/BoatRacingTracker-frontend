import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  setupRace() {
    this.dialogService.setupRace().subscribe();
  }

}
