import { TestBed } from '@angular/core/testing';

import { QrLoginService } from './qr-login.service';

describe('QrLoginService', () => {
  let service: QrLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
