/*
 * Project: Eight Bit CPU Emulator
 *
 * A clock service. Components can subscribe to events (see BaseComponent for example)
 * The ClockComponent manages the clock (start, stop).
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Injectable, OnDestroy , EventEmitter} from '@angular/core';
import {Observable, Subscription } from "rxjs";
import { Subject } from 'rxjs/Subject';

/**
 * Clock event values
 * 
 * @export
 * @enum {number}
 */
export enum ClockOptions {
  none        = 1,
  rising      = 2,
  falling     = 3
}

@Injectable()
export class ClockService {

  private isRunning     : boolean;
  private clkChange     : EventEmitter<ClockOptions> = new EventEmitter();
  private clockRising   : Subscription;
  private clockFalling  : Subscription;

  constructor() { 
    this.isRunning = false;
  }

  ngOnDestroy() {
    this.stopClock();
  }

  /**
   * Sends and event to subscribers
   * @param option type of event
   */
  sendEvent(option : ClockOptions) {
    this.clkChange.emit(option);
  }

  /**
   * Generates a manual clock event (actually 2, one for rising and 
   * one for falling edge)
   * 
   * @param {number} delay in ms
   * @memberof ClockService
   */
  manualClock(delay : number) {
    this.sendEvent(ClockOptions.rising);
    setTimeout(() => this.sendEvent(ClockOptions.falling),delay/2);
  }

  /**
   * Starts 2 clocks. One for rising edge and one for falling edge with a 
   * delay/2 interval between them
   * @param delay 
   */
  startClock(delay : number) {
    this.clockRising = Observable.timer(0,delay).subscribe(() => {
      this.sendEvent(ClockOptions.rising);
    });
    this.clockFalling = Observable.timer(delay / 2,delay).subscribe(() => {
      this.sendEvent(ClockOptions.falling);
    });
    this.isRunning = true;
  }

  /**
   * Stops the clock
   * 
   * @memberof ClockService
   */
  stopClock() {
    if (this.isRunning) {
      this.clockFalling.unsubscribe();
      this.clockRising.unsubscribe();
      this.isRunning = false;
    }
  }

  /**
   * Get the emitter
   */
  getClkChangeEmitter() {
    return this.clkChange;
  }


}
