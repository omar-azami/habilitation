import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartailsComponent } from './partails.component';

describe('PartailsComponent', () => {
  let component: PartailsComponent;
  let fixture: ComponentFixture<PartailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
