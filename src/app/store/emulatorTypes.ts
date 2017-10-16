/*
 * Project: Eight Bit CPU Emulator
 *
 * Type definitions for the reducer and store
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */


/**
 * The Action interface
 * 
 * @export
 * @interface Action
 */
export interface Action {
    type: string;
    payload?: any;
}

/**
 * The state interface
 * 
 * @export
 * @interface IEmulatorState
 */
export interface IEmulatorState {
    controlWord  : string;
    delayedInput : string;
    busValue     : number;
    stepValue    : number;
    instruction  : number;  
    rega         : number;
    regb         : number;
    mar          : number;
    alu          : number;
    out          : number;
    ram          : number[];
    counter      : number;
    carry        : boolean;
    cmdAddress   : number;
    language     : string;
    changedRam   : number;
    breakPoint   : number;
    ramValue()   : number;
}

let initialRam : number[] = [0x01E,0x2F,0xE0,0xF0,0,0,0,0,0,0,0,0,0,0,0x0E,0x1C];

/**
 * Implementation of the state interface as the initial state
 * 
 * @export
 * @interface IEmulatorState
 */
export const initialEmulatorState : IEmulatorState = {
    controlWord : 'MI|CO',
    delayedInput: '',
    busValue    : 0,
    stepValue   : 0,
    instruction : 0,
    rega        : 0,
    regb        : 0,
    mar         : 0,
    alu         : 0,
    out         : 0,
    ram         : initialRam,
    counter     : 0,
    carry       : false,
    cmdAddress  : 0,
    language    : 'en',
    changedRam  : -1,
    breakPoint  : -1,
    ramValue()  : number { return this.ram[this.mar];}
  };