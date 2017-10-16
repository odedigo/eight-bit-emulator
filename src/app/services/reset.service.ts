/*
 * Project: Eight Bit CPU Emulator
 *
 * A reset service
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Injectable, OnDestroy , EventEmitter} from '@angular/core';
import {Observable, Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ResetService {

  private resetChange : EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  /**
   * Sends a reset event to all observables
   * 
   * @memberof ResetService
   */
  private sendEvent() {
    this.resetChange.emit(true);
  }

  /**
   * Sends a reset event
   * 
   * @memberof ResetService
   */
  reset() {
    this.sendEvent();
  }

  /**
   * Get the emitter
   */
  getResetEmitter() {
    return this.resetChange;
  }
}
