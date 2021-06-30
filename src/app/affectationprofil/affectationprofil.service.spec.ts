import { TestBed } from '@angular/core/testing';

import { AffectationprofilService } from './affectationprofil.service';

describe('AffectationprofilService', () => {
  let service: AffectationprofilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffectationprofilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
