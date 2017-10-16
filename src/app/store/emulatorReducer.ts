/*
 * Project: Eight Bit CPU Emulator
 *
 * Store's reducer function
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import {CONTROL_WORD_CHANGE, BUS_VALUE_CHANGE, STEP_VALUE_CHANGE, INSTRUCTION_VALUE_CHANGE,
        REGA_VALUE_CHANGE, REGB_VALUE_CHANGE, MAR_VALUE_CHANGE, RAM_VALUE_CHANGE , CMD_ADDR_VALUE_CHANGE,SET_BREAK_POINT,
        ALU_VALUE_CHANGE, OUT_VALUE_CHANGE, PC_VALUE_CHANGE, ALL_EVENTS, LANG_CHANGE, CHANGED_RAM_CHANGE} from './emulatorActions';
import { Action, IEmulatorState, initialEmulatorState } from './emulatorTypes';
import { Reducer } from './emulatorStore';

/**
 * Our reducer. Generates a new state based on the input action and payload
 * 
 * @param state current state
 * @param action change action
 * @return a new state
 */
let reducer: Reducer<IEmulatorState> = (state: IEmulatorState = initialEmulatorState, action: Action) => {
  if (!state) {
      return initialEmulatorState;
  }
  //console.log("REDUCER type: "+action.type+"  payload: "+action.payload);

  switch (action.type) {
    case CONTROL_WORD_CHANGE: {     
      return Object.assign({}, state,  {
        controlWord: action.payload
      });
    }
    case BUS_VALUE_CHANGE: {
      var s = Object.assign({}, state,  {
        busValue: action.payload
      });
      return s;
    }
    case STEP_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        step: action.payload
      });
    }
    case INSTRUCTION_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        instruction: action.payload
      });        
    }
    case REGA_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        rega: action.payload
      });        
    }
    case REGB_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        regb: action.payload
      });        
    } 
    case MAR_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        mar : action.payload
      });        
    }
    case RAM_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        ram: Object.assign({},action.payload)
      });        
    }
    case OUT_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        out: action.payload
      });        
    }
    case PC_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        counter: action.payload
      });        
    }
    case ALU_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        alu: action.payload
      });        
    }
    case CMD_ADDR_VALUE_CHANGE: {
      return Object.assign({}, state,  {
        cmdAddress: action.payload
      });        
    }
    case LANG_CHANGE: {
      return Object.assign({}, state,  {
        language: action.payload
      });        
    }
    case CHANGED_RAM_CHANGE: {
      return Object.assign({}, state,  {
        changedRam: action.payload
      });              
    }
    case SET_BREAK_POINT: {
      return Object.assign({}, state,  {
        breakPoint: action.payload
      });              
    }
    case ALL_EVENTS: {
      return Object.assign({}, state,  {
        controlWord : action.payload.controlWord,
        busValue    : action.payload.busValue,
        stepValue   : action.payload.stepValue,
        instruction : action.payload.instruction,
        delayedInput: action.payload.delayedInput,
        rega        : action.payload.rega,
        regb        : action.payload.regb,
        mar         : action.payload.mar,
        alu         : action.payload.alu,
        out         : action.payload.out,
        ram         : Object.assign({},action.payload.ram),
        counter     : action.payload.counter,
        carry       : action.payload.carry,
        cmdAddress  : action.payload.cmdAddress,
        language    : action.payload.language,
        changedRam  : action.payload.changedRam,
        breakPoint  : action.payload.breakPoint      
      });        
    }
    default:
      return state;
  }
};

export {reducer};