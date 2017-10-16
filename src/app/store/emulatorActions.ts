/*
 * Project: Eight Bit CPU Emulator
 *
 * Reducer actions and helper functions for dispatching events
 * For example:
 *      store.dispatch(busValueChange(value))
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { IEmulatorState } from './emulatorTypes';

export const CONTROL_WORD_CHANGE        = "CONTROL_WORD_CHANGE";
export const BUS_VALUE_CHANGE           = "BUS_VALUE_CHANGE";
export const STEP_VALUE_CHANGE          = "STEP_VALUE_CHANGE";
export const INSTRUCTION_VALUE_CHANGE   = "INSTRUCTION_VALUE_CHANGE";
export const REGA_VALUE_CHANGE          = "REGA_VALUE_CHANGE";
export const REGB_VALUE_CHANGE          = "REGB_VALUE_CHANGE";
export const MAR_VALUE_CHANGE           = "MAR_VALUE_CHANGE";
export const ALU_VALUE_CHANGE           = "ALU_VALUE_CHANGE";
export const RAM_VALUE_CHANGE           = "RAM_VALUE_CHANGE";
export const PC_VALUE_CHANGE            = "PC_VALUE_CHANGE";
export const OUT_VALUE_CHANGE           = "OUT_VALUE_CHANGE";
export const CMD_ADDR_VALUE_CHANGE      = "CMD_ADDR_VALUE_CHANGE";
export const LANG_CHANGE                = "LANG_CHANGE";
export const CHANGED_RAM_CHANGE         = "CHANGED_RAM_CHANGE";
export const SET_BREAK_POINT            = "SET_BREAK_POINT";
export const ALL_EVENTS                 = "ALL_EVENTS";

export function controlWordChange(cw : string) {
    return {
        type: CONTROL_WORD_CHANGE,
        payload : cw
    }
}

export function busValueChange( value: number) {
    return {
        type: BUS_VALUE_CHANGE,
        payload : value
    }
}

export function stepValueChange( value : number ) {
    return {
        type: STEP_VALUE_CHANGE,
        payload : value
    }
}

export function instructionValueChange( value : number ) {
    return {
        type: INSTRUCTION_VALUE_CHANGE,
        payload : value
    }
}

export function regAValueChange( value : number ) {
    return {
        type: REGA_VALUE_CHANGE,
        payload : value
    }
}

export function regBValueChange( value : number ) {
    return {
        type: REGB_VALUE_CHANGE,
        payload : value
    }
}

export function marValueChange( value : number ) {
    return {
        type: MAR_VALUE_CHANGE,
        payload : value
    }
}

export function aluValueChange( value: number) {
    return {
        type: ALU_VALUE_CHANGE,
        payload : value
    }
}

export function outValueChange( value: number) {
    return {
        type: OUT_VALUE_CHANGE,
        payload : value
    }
}

export function ramValueChange( value: number[]) {
    return {
        type: RAM_VALUE_CHANGE,
        payload : value
    }
}

export function pcValueChange( value: number) {
    return {
        type: PC_VALUE_CHANGE,
        payload : value
    }
}

export function cmdAddrValueChange( value: number) {
    return {
        type: CMD_ADDR_VALUE_CHANGE,
        payload : value
    }
}

export function setStateEvent( newState: IEmulatorState) {
    return {
        type: ALL_EVENTS,
        payload : newState
    }
}

export function languageChange(lang : string) {
    return {
        type: LANG_CHANGE,
        payload : lang
    }
}


export function changedRamChange(index : number) {
    return {
        type: CHANGED_RAM_CHANGE,
        payload : index
    }
}

export function breakPointChange(index : number) {
    return {
        type: SET_BREAK_POINT,
        payload : index
    }
}
