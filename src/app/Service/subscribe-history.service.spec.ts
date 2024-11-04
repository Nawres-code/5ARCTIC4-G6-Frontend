import { TestBed } from '@angular/core/testing';

import { SubscribeHistoryService } from './subscribe-history.service';

describe('SubscribeHistoryService', () => {
  let service: SubscribeHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
