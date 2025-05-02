import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDegradationsComponent } from './liste-degradations.component';

describe('ListeDegradationsComponent', () => {
  let component: ListeDegradationsComponent;
  let fixture: ComponentFixture<ListeDegradationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDegradationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDegradationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
