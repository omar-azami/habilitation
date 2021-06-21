import { TestBed } from '@angular/core/testing';

import { ProfilmenuService } from './profilmenu.service';

describe('ProfilmenuService', () => {
  let service: ProfilmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
