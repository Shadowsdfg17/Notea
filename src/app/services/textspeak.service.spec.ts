import { TestBed } from '@angular/core/testing';

import { TextspeakService } from './textspeak.service';

describe('TextspeakService', () => {
  let service: TextspeakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextspeakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
