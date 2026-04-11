import { TestBed } from '@angular/core/testing';

import { DatabusService } from './databus.service';

describe('DatabusService', () => {
  let service: DatabusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
