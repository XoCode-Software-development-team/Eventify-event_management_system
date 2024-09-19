import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { queryParamsGuard } from './query-params.guard';

describe('queryParamsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => queryParamsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
