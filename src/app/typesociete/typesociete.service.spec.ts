import { TestBed } from '@angular/core/testing';

import { TypesocieteService } from './typesociete.service';

describe('TypesocieteService', () => {
  let service: TypesocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
