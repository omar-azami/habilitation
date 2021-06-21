import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesocieteComponent } from './typesociete.component';

describe('TypesocieteComponent', () => {
  let component: TypesocieteComponent;
  let fixture: ComponentFixture<TypesocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
