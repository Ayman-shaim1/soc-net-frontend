import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nonauthGuard } from './nonauth.guard';

describe('nonauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nonauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
