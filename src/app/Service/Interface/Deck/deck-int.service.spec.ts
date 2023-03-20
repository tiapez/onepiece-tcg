import { TestBed } from '@angular/core/testing';

import { DeckIntService } from './deck-int.service';

describe('DeckIntService', () => {
  let service: DeckIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
