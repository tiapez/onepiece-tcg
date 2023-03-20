import { TestBed } from '@angular/core/testing';

import { CardListIntService } from './card-list-int.service';

describe('CardListIntService', () => {
  let service: CardListIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardListIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
