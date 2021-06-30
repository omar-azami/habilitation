import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationprofilComponent } from './affectationprofil.component';

describe('AffectationprofilComponent', () => {
  let component: AffectationprofilComponent;
  let fixture: ComponentFixture<AffectationprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
