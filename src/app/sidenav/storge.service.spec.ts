import { TestBed } from '@angular/core/testing';

import { StorgeService } from './storge.service';

describe('StorgeService', () => {
  let service: StorgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
