import { TestBed } from '@angular/core/testing';

import { CommentreportService } from './commentreport.service';

describe('CommentreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentreportService = TestBed.get(CommentreportService);
    expect(service).toBeTruthy();
  });
});
