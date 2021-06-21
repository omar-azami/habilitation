import { TestBed } from '@angular/core/testing';

import { UtilisateurhistoriqueService } from './utilisateurhistorique.service';

describe('UtilisateurhistoriqueService', () => {
  let service: UtilisateurhistoriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurhistoriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
