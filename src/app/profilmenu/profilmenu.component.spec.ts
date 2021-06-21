import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilmenuComponent } from './profilmenu.component';

describe('ProfilmenuComponent', () => {
  let component: ProfilmenuComponent;
  let fixture: ComponentFixture<ProfilmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
