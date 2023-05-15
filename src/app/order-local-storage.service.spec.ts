import { TestBed } from '@angular/core/testing';

import { OrderLocalStorageService } from './services/order-local-storage.service';

describe('OrderLocalStorageService', () => {
  let service: OrderLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
