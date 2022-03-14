import { TestBed } from '@angular/core/testing';

import { ActivateGuardGuard } from './activate-guard.guard';

describe('ActivateGuardGuard', () => {
  let guard: ActivateGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivateGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
