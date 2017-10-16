/*
 * Project: Eight Bit CPU Emulator
 *
 * The main logic for the emulator. on each clock event, a new state is calculated and 
 * sent to the store to be distributed to the various components 
 * 
 * Rising and Falling clock edges: 
 * ===============================
 * In a CPU, the clock is a pulse that has a rising and a falling edge. 
 * Some of the components are triggered by the rising edge while others by the falling
 * edge.
 * 
 * The step counter (micro-commands) changes on the falling edge
 * so that the control line could be prepared before the next clock event.
 * 
 * In our implementation, this pulse is simulated by 2 clock events, one for the rising 
 * edge and another for the falling edge
 * 
 * Delayed Input
 * =============
 * When a register (like A, B, RAM, OUTPUT, PC etc.) needs to write its value to the bus, 
 * the operation is done immediately when the relevant control line turns on (i.e., RO,
 * AO, CO etc.)
 * 
 * However, when a register needs to read the value from the bus, it waits for the next 
 * rising clock event. In this emulator, these are called delayed inputs.
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Mon Sep 25 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { OnDestroy , OnInit} from '@angular/core';
import { ControlTableService } from '../services/control-table.service';
import { ClockService, ClockOptions } from "../services/clock.service";
import { AppStore } from '../store/emulatorStore';
import { ResetService } from "../services/reset.service";
import { RamChangesService } from '../services/ram-changes.service';
import { Subscription } from "rxjs";
import { IEmulatorState, initialEmulatorState } from '../store/emulatorTypes';
import { IUnsubscribeCallback } from '../store/storeListeners';
import { CONTROL_WORD_CHANGE, BUS_VALUE_CHANGE, STEP_VALUE_CHANGE, INSTRUCTION_VALUE_CHANGE,
    REGA_VALUE_CHANGE, REGB_VALUE_CHANGE, MAR_VALUE_CHANGE, ALU_VALUE_CHANGE, PC_VALUE_CHANGE,
    RAM_VALUE_CHANGE, OUT_VALUE_CHANGE, ALL_EVENTS, ramValueChange,
    setStateEvent } from '../store/emulatorActions';


export class MainEmulator {
  // const
  readonly maxStepValue : number = 4;
  readonly maxPcValue   : number = 15;
  readonly initialDelay : number = 500;
  readonly maxValue     : number = 255;

  // Subscription
  clkSubscription : Subscription;
  resetSubscription : Subscription;
  ramSubscription : Subscription;

  // RAM
  initialRam    : number[] = [];

  // The state (received from the store)
  private state : IEmulatorState = initialEmulatorState;

    constructor(private store        : AppStore, 
              private clkService     : ClockService,
              private resetService   : ResetService,
              private controlService : ControlTableService,
              private ramService     : RamChangesService) {                
                
        this.manageSubscriptions();
        this.sendInitialState();
    }

    /**
     * Sets the initia state at the store
     * 
     * @memberof MainEmulator
     */
    sendInitialState() {
        setTimeout(() => {
            this.state = this.store.getState();
            this.initialRam = this.state.ram;
            this.store.dispatch(setStateEvent(this.state));
        }, this.initialDelay);
    }

    /**
     * Cleanup
     * 
     * @memberof MainEmulator
     */
    ngOnDestroy() {
        if (!this.clkSubscription.closed)
            this.clkSubscription.unsubscribe();
        if (!this.resetSubscription.closed)
            this.resetSubscription.unsubscribe();
            if (!this.ramSubscription.closed)
            this.ramSubscription.unsubscribe();
        this.store.dispatch(setStateEvent(this.state));
    }

    /**
     * Subscribe to all services
     * 
     * @memberof MainEmulator
     */
    manageSubscriptions() {   
        // Clock
        this.clkSubscription = this.clkService.getClkChangeEmitter().subscribe((item:any) => this.handleClockEvent(item));
        // Reset
        this.resetSubscription = this.resetService.getResetEmitter().subscribe((item:any) => this.handleResetEvent(item));    
        // RAM
        this.ramSubscription = this.ramService.getRamEmitter().subscribe((item:any) => this.handleRamEvent(item));    
    }

    /**
     * Clock events
     * 
     * @param {any} event 
     * @memberof MainEmulator
     */
    handleClockEvent(event:any) {
        if (event == ClockOptions.rising) {
            var s = this.store.getState();
            this.state.breakPoint = s.breakPoint;
            // HLT
            if (this.controlService.has(this.state.controlWord,'HLT')) {
                this.clkService.stopClock();
            }

            // Output
            this.handleOutput(this.state.controlWord);

            // Normal input
            this.handleInput(this.state.controlWord, false); 
            
            // Update store
            this.store.dispatch(setStateEvent(this.state));
        }
        else if (event == ClockOptions.falling) {
            // Calculate next control word
            
            this.state = this.store.getState();
             // Delayed input
            this.handleInput(this.state.delayedInput, true);                        

            this.incrementStep();     
            this.state.controlWord = this.controlService.translate(this.getMsb(this.state.instruction), this.state.stepValue);                        
            this.store.dispatch(setStateEvent(this.state));
        }            
    }

    /**
     * Calculate state of Output control lines
     * 
     * @param {string} cw 
     * @returns 
     * @memberof MainEmulator
     */
    handleOutput(cw:string) {
        if (cw == "")
            return;
        // Output
        if (this.controlService.has(cw,'CO')) {
            this.state.busValue = this.state.counter;
        }
        if (this.controlService.has(cw,'AO')) {
            this.state.busValue = this.state.rega;
        }
        if (this.controlService.has(cw,'RO')) {
            this.state.busValue = this.state.ramValue();
        }
        if (this.controlService.has(cw,'IO')) {
            this.state.busValue = this.getLsb(this.state.instruction);
        }
        if (this.controlService.has(cw,'EO')) {
            this.state.busValue = this.state.alu;
        }
    }

    /**
     * Calculate state of Input control lines.
     * See above for explanation of delayed events
     * 
     * @param {string} cw 
     * @param {boolean} delayed 
     * @returns 
     * @memberof MainEmulator
     */
    handleInput(cw:string, delayed : boolean) {
        if (cw == "")
            return;
        this.state.changedRam = -1;
        var addition = !this.controlService.has(this.state.controlWord,'SU');
        if (this.controlService.has(cw,'CE')) {
            if (!delayed) {
                this.state.delayedInput += "|CE";
            }
            else {
                this.incrementProgramCounter();
                if (this.state.cmdAddress == this.state.breakPoint) {
                    this.clkService.stopClock();
                }
            }
        }
        if (this.controlService.has(cw,'AI')) {
            if (!delayed) {
                this.state.delayedInput += "|AI";
            }
            else {
                this.state.rega = this.state.busValue;
                this.state.carry = false;
                this.state.alu = (addition) ? (this.state.rega + this.state.regb) : (this.state.rega - this.state.regb);
                if (this.state.alu > this.maxValue)
                    this.state.carry = true;
        }
        }
        if (this.controlService.has(cw,'BI')) {
            if (!delayed) {
                this.state.delayedInput += "|BI";
            }
            else {
                this.state.regb = this.state.busValue;
                this.state.carry = false;
                this.state.alu = (addition) ? (this.state.rega + this.state.regb) : (this.state.rega - this.state.regb);
                if (this.state.alu > this.maxValue)
                    this.state.carry = true;
            }
        }
        if (this.controlService.has(cw,'II')) {
            if (!delayed) {
                this.state.delayedInput += "|II";
            }
            else {
                this.state.instruction = this.state.busValue;
            }
        }
        if (this.controlService.has(cw,'MI')) {
            if (!delayed) {
                this.state.delayedInput += "|MI";
            }
            else {
                this.state.mar = this.state.busValue;                
            }
        }
        if (this.controlService.has(cw,'RI')) {
            if (!delayed) {
                this.state.delayedInput += "|RI";
            }
            else {
                this.state.ram[this.state.mar] = this.state.busValue;
                this.state.changedRam = this.state.mar;
            }
        }
        if (this.controlService.has(cw,'OI')) {
            if (!delayed) {
                this.state.delayedInput += "|OI";
            }
            else {
                this.state.out = this.state.busValue;
            }
        }
        var jump = this.controlService.has(cw,'JMP');
        var jc = this.controlService.has(cw,'JC');
        if (jump && delayed) {
            this.state.counter = this.state.busValue;            
        }
        else if ((jc && this.state.carry) || jump) {
            if (!delayed) {
                this.state.delayedInput += "|JMP";
            }
        }      
        if (delayed) 
            this.state.delayedInput = '';
    }

    /**
     * Reset events
     * 
     * @param {any} event 
     * @memberof MainEmulator
     */
    handleResetEvent(event:any) {
        this.state = Object.assign({}, initialEmulatorState, {
            ram : Object.assign({},this.initialRam),
            breakPoint : this.store.getState().breakPoint
        });
        this.store.dispatch(setStateEvent(this.state));        
    }

    /* ================================================================ */

    /**
     * Increments the program counter
     * 
     * @memberof MainEmulator
     */
    incrementStep() {
        var val = this.state.stepValue;
        if (val == this.maxStepValue) 
          val = 0;    
        else
          val = val + 1;
        this.setStepValue(val);    
    }

  /**
   * Sets the step value
   * 
   * @param {number} value 
   * @memberof LogicComponent
   */
  setStepValue(value : number) {
    this.state.stepValue = value;
  }

  /**
   * Increment PC
   * 
   * @memberof MainEmulator
   */
  incrementProgramCounter() {
    let val = this.state.counter;
    this.state.cmdAddress = val;
    if (val == this.maxPcValue) 
      val = 0;    
    else
      val = val + 1;
    this.setProgramCounterValue(val);    
  }

  /**
   * Sets PC
   * 
   * @param {any} value 
   * @memberof MainEmulator
   */
  setProgramCounterValue(value:any) {
      this.state.counter = value;
  }

  /**
   * Get the LSB of a byte
   * 
   * @param {number} value 
   * @returns {number} 
   * @memberof MainEmulator
   */
  getLsb(value: number) : number {
      return (value & 0x0F);
  }
  
  /**
   * Get the MSB of a byte
   * 
   * @param {number} value 
   * @returns {number} 
   * @memberof MainEmulator
   */
  getMsb(value : number) : number {
      return (value) >> 4;  
  }

  /**
   * Sets the RAM contents
   * 
   * @param {numberp[]} contents 
   * @memberof MainEmulator
   */
  setRamContents( contents : number[]) : void {
      this.initialRam = contents;
  }

  /**
   * Handle ram chanegs event
   * 
   * @param {any} item 
   * @memberof MainEmulator
   */
  handleRamEvent(item:any) {
    this.initialRam = item;
    this.store.dispatch(ramValueChange(item));
    this.state = Object.assign({}, this.state , {
        ram: Object.assign({}, item)
    });
  }
} 