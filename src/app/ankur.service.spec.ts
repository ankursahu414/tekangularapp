import { TestBed } from '@angular/core/testing';

import { AnkurService } from './ankur.service';

describe('AnkurService', () => {
  let service: AnkurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnkurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
