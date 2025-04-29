import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegratationFormComponent } from './degratation-form.component';

describe('DegratationFormComponent', () => {
  let component: DegratationFormComponent;
  let fixture: ComponentFixture<DegratationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegratationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegratationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
