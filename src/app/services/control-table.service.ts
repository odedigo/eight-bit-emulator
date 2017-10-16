/*
 * Project: Eight Bit CPU Emulator
 *
 * This service acts as a tranlation table (used by the Logic component) to
 * convert the Instruction and Step values into a new control word.
 * 
 * The translation table holds the control lines that implement the CPU's 
 * assembler instructions
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sun Sep 24 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Injectable } from '@angular/core';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class ControlTableService {

  // This table defines the break down of the assembler commands into
  // micro-commands
  private table : string[];
  private table1 : string[];

  // The value for control line - used to know which led to turn on and off
  // in the control-word component
  readonly lineValues  : any = { 'HLT': 0b1000000000000000, 
                          'MI' : 0b0100000000000000,
                          'RI' : 0b0010000000000000, 
                          'RO' : 0b0001000000000000, 
                          'II' : 0b0000100000000000, 
                          'IO' : 0b0000010000000000, 
                          'AI' : 0b0000001000000000, 
                          'AO' : 0b0000000100000000, 
                          'BI' : 0b0000000010000000, 
                          'EO' : 0b0000000001000000, 
                          'SU' : 0b0000000000100000, 
                          'OI' : 0b0000000000010000, 
                          'JMP': 0b0000000000001000, 
                          'JC' : 0b0000000000000100, 
                          'CE' : 0b0000000000000010, 
                          'CO' : 0b0000000000000001, 
                        };

  // The value of each command                        
  readonly commands  : any = { 'NOP' : 0 ,
                        'LDA' : 1 ,
                        'ADD' : 2 ,
                        'SUB' : 3 ,
                        'STA' : 4 ,
                        'LDIA': 5 ,
                        'JMP' : 6 ,
                        'LDIB': 7 ,
                        'JC'  : 8 ,
                        'ATBI': 9 ,
                        'JG'  : 10 ,
                        'JL'  : 11 ,
                        //'-1'  : 12 , // undefined
                        //'-2'  : 13 , // undefined
                        'OUT' : 14 ,
                        'HLT' : 15 ,
                      };

  commandDescriptions : any[string] = [];                      
  
  constructor(private translateService: TranslateService) { 
    this.defaultTable();
    this.loadTranslations();
  }

  /**
   * Translates input into the right control word using the translation table
   * 
   * @param {number} instruction 
   * @param {number} step 
   * @returns {string} 
   * @memberof ControlTableService
   */
  translate(instruction : number, step : number) : string {
    return this.table[instruction * 8 + step];
  }

  /**
   * Checks if a value exists in the given cw string
   * Used by components that receive a ControlWord and want to check
   * if their control lines are present
   * 
   * @param {string} cw 
   * @param {string} searchFor 
   * @returns boolean - true if exists
   * @memberof ControlTableService
   */
  has(cw : string, searchFor: string) : boolean {
    return (cw.indexOf(searchFor.toUpperCase()) != -1);
  }

  /**
   * Sets a new tranlation table
   * 
   * @param {string[]} tbl 
   * @memberof ControlTableService
   */
  set(tbl : string[]) : void {
    Object.assign(this.table, tbl);
  }

  /**
   * Gets a copy of the translation table
   * 
   * @returns {string[]} 
   * @memberof ControlTableService
   */
  get() : string[] {
    return Object.assign({},this.table);
  }

  /**
   * Returns a copy of the available commands
   * 
   * @returns 
   * @memberof ControlTableService
   */
  getCommands() {
    return Object.assign({}, this.commands);
  }

  /**
   * Translates cw (which is a string like 'IO|AI') into a 16 bits number
   * Used to turn on and off the control-word leds
   * 
   * @param {string} cw 
   * @returns {number} 
   * @memberof ControlTableService
   */
  translateControlWord(cw : string) : number {
    if (cw == null)
      return 0;
    let value = 0;
    let lines = cw.split('|');
    for (let line in lines) {
      value = value | this.lineValues[lines[line]];
    }
    return value;
  }

  /**
   * Given the command name, return its value
   * 
   * @param {string} cmd 
   * @returns {number} 
   * @memberof ControlTableService
   */
  getCommandValue(cmd : string) : number {
    return this.commands[cmd];
  }

  /**
   * Given the command value, return its name
   * 
   * @param {number} cmd 
   * @returns {string} 
   * @memberof ControlTableService
   */
  getCommandName(cmd : number) : string {
    for (var c in this.commands) {
      if (this.commands[c] == cmd)
        return c;
    }
    return "NA";
  }

  /**
   * A translation table that breaks down each command to micro-commands
   *  
   * @param {string} cmd - the command 
   * @returns {string[]} -  an array of micro-commands to execute
   * @memberof ControlTableService
   */
  getMicroCommands( cmd : string, appendTo8: boolean = false ) : string[] {
    let suffix = (appendTo8) ?  ['',   '',   ''] : [];
    let arr;
    
    switch (cmd) {
      case 'NOP': {
        return [ 'MI|CO',  'RO|II|CE',   '',         '',         ''].concat(suffix);
      }
      case 'LDA': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|MI',    'RO|AI',    ''] .concat(suffix);
      }
      case 'ADD': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|MI',    'RO|BI',    'EO|AI'] .concat(suffix);
      }
      case 'SUB': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|MI',    'RO|BI',    'EO|AI|SU'] .concat(suffix);
      }
      case 'STA': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|MI',    'AO|RI',    ''] .concat(suffix);
      }
      case 'LDIA': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|AI',    '',         ''] .concat(suffix);
      }
      case 'JMP': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|JMP',     '',         ''] .concat(suffix);
      }
      case 'LDIB': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|BI',    '',         ''] .concat(suffix);
      }
      case 'JC': {
        return [ 'MI|CO',  'RO|II|CE',   'IO|JC',    '',         ''] .concat(suffix);
      }
      case 'ATBI': {
        return [ 'MI|CO',  'RO|II|CE',   'AO|BI',    'IO|AI',    ''] .concat(suffix);
      }
      case 'JG': {
        return [ 'MI|CO',  'RO|II|CE',   'SU|IO|JC', '',         ''] .concat(suffix);
      }
      case 'JL': {
        return [ 'MI|CO',  'RO|II|CE',   'SU|IO|JC', '',         ''] .concat(suffix);
      }
      case 'OUT': {
        return [ 'MI|CO',  'RO|II|CE',   'AO|OI',    '',         ''] .concat(suffix);
      }
      case 'HLT': {
        return [ 'MI|CO',  'RO|II|CE',   'HLT',      '',         ''] .concat(suffix);
      }
      default: {
        return ['MI|CO',  'RO|II|CE','','',''].concat(suffix);
      }
    }
  }

  getCommandDescription(cmd : string) : string {
    switch (cmd) {
      case 'NOP': {
        return this.commandDescriptions["NOP"];
      }
      case 'LDA': {
        return this.commandDescriptions["LDA"];
      }
      case 'ADD': {
        return this.commandDescriptions["ADD"];
      }
      case 'SUB': {
        return this.commandDescriptions["SUB"];
      }
      case 'STA': {
        return this.commandDescriptions["STA"];
      }
      case 'LDIA': {
        return this.commandDescriptions["LDIA"];
      }
      case 'JMP': {
        return this.commandDescriptions["JMP"];
      }
      case 'LDIB': {
        return this.commandDescriptions["LDIB"];
      }
      case 'JC': {
        return this.commandDescriptions["JC"];
      }
      case 'ATBI': {
        return this.commandDescriptions["ATBI"];
      }
      case 'JG': {
        return this.commandDescriptions["JG"];
      }
      case 'JL': {
        return this.commandDescriptions["JL"];
      }
      case 'OUT': {
        return this.commandDescriptions["OUT"];
      }
      case 'HLT': {
        return this.commandDescriptions["HLT"];
      }
      default: {
        return this.commandDescriptions["DEFAULT"];
      }
    }
}

  /**
   * Assigns a default translation table
   * 
   * @memberof ControlTableService
   */
  defaultTable() {
    
    this.table = this.getMicroCommands('NOP',true).concat(this.getMicroCommands('LDA',true)).
                    concat(this.getMicroCommands('ADD',true)).concat(this.getMicroCommands('SUB',true)).
                    concat(this.getMicroCommands('STA',true)).concat(this.getMicroCommands('LDIA',true)).
                    concat(this.getMicroCommands('JMP',true)).concat(this.getMicroCommands('LDIB',true)).
                    concat(this.getMicroCommands('JC',true)).concat(this.getMicroCommands('ATBI',true)).
                    concat(this.getMicroCommands('JG',true)).concat(this.getMicroCommands('JL',true)).
                    concat(this.getMicroCommands('EMPTY',true)).concat(this.getMicroCommands('EMPTY',true)).
                    concat(this.getMicroCommands('OUT',true)).concat(this.getMicroCommands('HLT',true));
    
  }

  /**
   * Loads text from the translation service
   * 
   * @memberof ControlTableService
   */
  loadTranslations() {
    let prgs = this.translateService.get('CMDS.DESC').subscribe((res: any) => {
      this.commandDescriptions = [];
      this.commandDescriptions["NOP"] = res.NOP;
      this.commandDescriptions["NOP"] = res.NOP;
      this.commandDescriptions["LDA"] = res.LDA;
      this.commandDescriptions["ADD"] = res.ADD;
      this.commandDescriptions["SUB"] = res.SUB;
      this.commandDescriptions["STA"] = res.STA;
      this.commandDescriptions["LDIA"] = res.LDIA;
      this.commandDescriptions["JMP"] = res.JMP;
      this.commandDescriptions["LDIB"] = res.LDIB;
      this.commandDescriptions["JC"] = res.JC;
      this.commandDescriptions["ATBI"] = res.ATBI;
      this.commandDescriptions["JG"] = res.JG;
      this.commandDescriptions["JL"] = res.JL;
      this.commandDescriptions["OUT"] = res.OUT;
      this.commandDescriptions["HLT"] = res.HLT;
      this.commandDescriptions["DEFAULT"] = res.DEFAULT;
      prgs.unsubscribe();
    });     
    
  }
}
