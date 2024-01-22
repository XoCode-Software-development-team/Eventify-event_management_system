import { TestBed } from '@angular/core/testing';

import { VendorServiceService } from './vendor-service.service';

describe('VendorServiceService', () => {
  let service: VendorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
