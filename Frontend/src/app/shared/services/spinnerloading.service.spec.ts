import { TestBed } from '@angular/core/testing';

import { SpinnerloadingService } from './spinnerloading.service';

describe('SpinnerloadingService', () => {
  let service: SpinnerloadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerloadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
