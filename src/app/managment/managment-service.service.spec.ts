import { TestBed } from '@angular/core/testing';

import { ManagmentServiceService } from './managment-service.service';

describe('ManagmentServiceService', () => {
  let service: ManagmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
