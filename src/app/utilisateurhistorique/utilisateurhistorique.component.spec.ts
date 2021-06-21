import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurhistoriqueComponent } from './utilisateurhistorique.component';

describe('UtilisateurhistoriqueComponent', () => {
  let component: UtilisateurhistoriqueComponent;
  let fixture: ComponentFixture<UtilisateurhistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurhistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurhistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
