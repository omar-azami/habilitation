import { TestBed } from '@angular/core/testing';

import { PagemenuService } from './pagemenu.service';

describe('PagemenuService', () => {
  let service: PagemenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagemenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
