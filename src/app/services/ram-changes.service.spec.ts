/*
 * Project: Eight Bit CPU Emulator
 *
 *
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Oct 03 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { TestBed, inject } from '@angular/core/testing';

import { RamChangesService } from './ram-changes.service';

describe('RamChangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RamChangesService]
    });
  });

  it('should be created', inject([RamChangesService], (service: RamChangesService) => {
    expect(service).toBeTruthy();
  }));
});
