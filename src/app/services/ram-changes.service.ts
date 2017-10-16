/*
 * Project: Eight Bit CPU Emulator
 *
 * Allows components setting new RAM contents
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Injectable , EventEmitter, OnDestroy} from '@angular/core';

@Injectable()
export class RamChangesService {
  private ramChange : EventEmitter<number[]> = new EventEmitter();
  
  constructor() { }

  saveRam( newRam : number[]) {
    this.getRamEmitter().emit(newRam);
  }

  /**
   * Get the emitter
   */
  getRamEmitter() {
    return this.ramChange;
  }
}
