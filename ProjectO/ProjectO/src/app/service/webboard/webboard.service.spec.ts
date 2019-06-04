import { TestBed } from '@angular/core/testing';

import { WebboardService } from './webboard.service';

describe('WebboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebboardService = TestBed.get(WebboardService);
    expect(service).toBeTruthy();
  });
});
