import { TestBed } from '@angular/core/testing';

import { TypeentiteService } from './typeentite.service';

describe('TypeentiteService', () => {
  let service: TypeentiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeentiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
