import { TestBed } from '@angular/core/testing';

import { TotallikeService } from './totallike.service';

describe('TotallikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotallikeService = TestBed.get(TotallikeService);
    expect(service).toBeTruthy();
  });
});
