import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuIncidentComponent } from './apercu-incident.component';

describe('ApercuIncidentComponent', () => {
  let component: ApercuIncidentComponent;
  let fixture: ComponentFixture<ApercuIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApercuIncidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApercuIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
