import { TestBed } from '@angular/core/testing';

import { TotalcommentService } from './totalcomment.service';

describe('TotalcommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalcommentService = TestBed.get(TotalcommentService);
    expect(service).toBeTruthy();
  });
});
