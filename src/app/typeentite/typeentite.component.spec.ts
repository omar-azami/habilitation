import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeentiteComponent } from './typeentite.component';

describe('TypeentiteComponent', () => {
  let component: TypeentiteComponent;
  let fixture: ComponentFixture<TypeentiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeentiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeentiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
