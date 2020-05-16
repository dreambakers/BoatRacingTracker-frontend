import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousRacesComponent } from './previous-races.component';

describe('PreviousRacesComponent', () => {
  let component: PreviousRacesComponent;
  let fixture: ComponentFixture<PreviousRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousRacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
