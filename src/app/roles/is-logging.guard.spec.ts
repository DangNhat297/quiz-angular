import { TestBed } from '@angular/core/testing';

import { IsLoggingGuard } from './is-logging.guard';

describe('IsLoggingGuard', () => {
  let guard: IsLoggingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
