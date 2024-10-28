import { TestBed } from '@angular/core/testing';

import { PosteServiceService } from './poste-service.service';

describe('PosteServiceService', () => {
  let service: PosteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
