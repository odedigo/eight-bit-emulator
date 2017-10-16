import { TestBed, inject } from '@angular/core/testing';

import { ControlTableService } from './control-table.service';

describe('ControlTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlTableService]
    });
  });

  it('should be created', inject([ControlTableService], (service: ControlTableService) => {
    expect(service).toBeTruthy();
  }));
});
