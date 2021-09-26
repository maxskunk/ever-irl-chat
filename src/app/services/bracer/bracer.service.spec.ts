import { TestBed } from '@angular/core/testing';

import { BracerService } from './bracer.service';

describe('BracerService', () => {
  let service: BracerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BracerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
