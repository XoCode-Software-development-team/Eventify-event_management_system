import { TestBed } from '@angular/core/testing';

import { VendorFollowService } from './vendor-follow.service';

describe('VendorFollowService', () => {
  let service: VendorFollowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorFollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
