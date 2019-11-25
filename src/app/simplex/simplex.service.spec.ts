import { TestBed } from '@angular/core/testing';

import { SimplexService } from './simplex.service';

describe('SimplexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimplexService = TestBed.get(SimplexService);
    expect(service).toBeTruthy();
  });
});
