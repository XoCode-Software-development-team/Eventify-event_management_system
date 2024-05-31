import { TestBed } from '@angular/core/testing';

import { ServiceAndResourceService } from './serviceAndResource.service';

describe('ServiceAndResourceService', () => {
  let serviceAndResource: ServiceAndResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    serviceAndResource = TestBed.inject(ServiceAndResourceService);
  });

  it('should be created', () => {
    expect(serviceAndResource).toBeTruthy();
  });
});
