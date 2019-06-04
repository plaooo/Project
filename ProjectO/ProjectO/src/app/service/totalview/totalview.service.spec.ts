import { TestBed } from '@angular/core/testing';

import { TotalviewService } from './totalview.service';

describe('TotalviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalviewService = TestBed.get(TotalviewService);
    expect(service).toBeTruthy();
  });
});
