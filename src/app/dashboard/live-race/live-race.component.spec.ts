import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRaceComponent } from './live-race.component';

describe('LiveRaceComponent', () => {
  let component: LiveRaceComponent;
  let fixture: ComponentFixture<LiveRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
