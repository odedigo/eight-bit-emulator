/*
 * Project: Eight Bit CPU Emulator
 *
 * Displays the RAM contents
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Mon Sep 25 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit , ViewChild} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { ControlTableService } from '../services/control-table.service';
import { IEmulatorState } from '../store/emulatorTypes';
import { RamChangesService } from '../services/ram-changes.service';
import {SelectItem} from 'primeng/primeng';
import {TranslateService} from 'ng2-translate';
import { breakPointChange } from '../store/emulatorActions';
import {RadioButtonModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';

@Component({
  selector: 'app-ram-display',
  templateUrl: './ram-display.component.html',
  styleUrls: ['./ram-display.component.css']
})
export class RamDisplayComponent extends BaseComponent implements OnInit {

  readonly ramSize : number = 16;

  // Binded - whether the RAM edit fields are disabled
  editInputDisabled : boolean = false;

  // Binded - whether to show the RAM editor dialog
  showEditor : boolean = false;
  // Binded - whether to show the micro commands dialog
  showMicroCmds : boolean = false;

  // Binded - the micro commands table
  showMicroCmdsArray : any[] = [];

  // The current content of the RAM in the emulator's state
  private ramContents : number[] = [];
  // Binded - displays the RAM contents
  ramTable : any[] = [];

  // Binded - breakpoint
  breakPoint : string = '';

  // Binded - the RAM values in the editor
  editRamValues : string[] = ['','','','','','','','','','','','','','','',''];

  // Binded - Current values
  currentCommandDescription : string = '';
  currentCommandName : string = "";
  microCommandsArray : any[] = [];
  decimalValue : string[] = [];

  // Binded - dropbox canned programs
  cannedPrograms: SelectItem[] = [];
  selectedProgram : string = '';
  
  // Binded - current step indicator
  stepArray : string[] = ['','','','',''];
  inactiveStep : string = '0px';
  activeStep : string = '1px dashed black';

  // Binded - Current cmd indicator
  curCmdIndicator : string[] = ['','','','','','','','','','','','','','',''];
  inactiveCurCmd : string = '0px';
  activeCurCmd : string = '1px dashed blue';
  
  // Current RAM change indicator
  curRamChangeIndicator : string[] = ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white'];
  inactiveRamChange : string = 'white';
  activeRamChange : string = 'gold';

    // Binded - 1 to 16 in hex
  hexValue : string[] = ['0x00','0x01','0x02','0x03','0x04','0x05','0x06','0x07','0x08','0x09','0x0A','0x0B','0x0C','0x0D','0x0E','0x0F'];

  // Binded - selected break point radio button  
  selectedBpValue  : string = 'none';
  
  /**
   * Creates an instance of RamDisplayComponent.
   * 
   * @param {AppStore} store 
   * @param {ControlTableService} controlService 
   * @param {RamChangesService} ramService 
   * @param {TranslateService} translateService 
   * @memberof RamDisplayComponent
   */
  constructor(protected store:AppStore, private controlService : ControlTableService,
             private ramService : RamChangesService, private translateService: TranslateService) { 
    super();
    this.loadPrograms(); 
    super.subscribeToStateChange(store);
    this.setActiveCmd(0);
  }

  /**
   * Init
   * 
   * @memberof RamDisplayComponent
   */
  ngOnInit() {
    this.loadRamContents();
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof RamDisplayComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {
    this.loadRamContents();
    this.loadCommandDescription(newState.ram[newState.cmdAddress]);
    this.setActiveCmd(newState.cmdAddress);
    this.setChangedRam(newState.changedRam);
    this.setBreakpointDisplay(newState.breakPoint);
    this.setStepIndicator(newState.stepValue);
  }

  setStepIndicator(step : number) {
    for (let i=0 ; i< this.ramSize; i++) {
      if (i == step)
        this.stepArray[i] = this.activeStep;
      else
        this.stepArray[i] = this.inactiveStep;
    }
  }

  setBreakpointDisplay(breakPoint : number) {
    if (breakPoint == -1)
      this.selectedBpValue = 'none';
    else  
      this.selectedBpValue = breakPoint.toString();
  }

  setChangedRam( index : number) {
    for (let i=0 ; i< this.ramSize; i++) {
      if (i == index)
        this.curRamChangeIndicator[i] = this.activeRamChange;
      else
        this.curRamChangeIndicator[i] = this.inactiveRamChange;
    }
  }

  /**
   * Sets tghe marker of the current command
   * 
   * @param {number} index 
   * @memberof RamDisplayComponent
   */
  setActiveCmd(index : number) {
    for (let i=0 ; i< this.ramSize; i++) {
      if (i == index)
        this.curCmdIndicator[i] = this.activeCurCmd;
      else
        this.curCmdIndicator[i] = this.inactiveCurCmd;
    }
  }

  /**
   * Displays the RAM contents
   * 
   * @memberof RamDisplayComponent
   */
  loadRamContents() {
    this.ramContents = Object.assign({},this.store.getState().ram);

    this.ramTable = []; //'Cmd','Addr', 'Hex', 'Bin'];                  
    for (let i=0; i<this.ramSize ; i++) {
      var textCmd = this.getCommand(this.ramContents[i])+" "+(this.ramContents[i] & 0x0F);
      var addr = this.hexPrefix2(i.toString(16));
      var hex = this.hexPrefix2(this.ramContents[i].toString(16));
      var bin = this.binPrefix(this.ramContents[i].toString(2));
      this.ramTable.push([textCmd, addr, hex, bin]);
    }
  }

  /**
   * Displays the current command description
   * 
   * @param {number} cmd 
   * @memberof RamDisplayComponent
   */
  loadCommandDescription(cmd : number) {
    let cmdString = this.getCommand(cmd);
    this.currentCommandDescription = this.controlService.getCommandDescription(cmdString);
    this.microCommandsArray = this.controlService.getMicroCommands(cmdString);
    this.currentCommandName = cmdString + " "+(cmd & 0x0F);
  }
  /**
   * Formats a number s HEX with 2 digits
   * 
   * @param {string} hex 
   * @returns {string} 
   * @memberof RamDisplayComponent
   */
  hexPrefix2(hex : string) : string {
    var len = hex.length;
    if (len<2)
      return "0x0"+hex;
    return "0x"+hex;
  }

  /**
   * Formats a number as bin with 8 digits
   * 
   * @param {string} bin 
   * @returns {string} 
   * @memberof RamDisplayComponent
   */
  binPrefix(bin : string, numDigits : number = 8) : string {
    var len = bin.length;
    var s = "";
    for (let i = 0 ; i < (numDigits-len); i++)
      s += "0";
    s += bin;
    return s;
  }
  
  /**
   * Given the command value (we need only the MSB)
   * return the command's name
   * 
   * @param {number} value 
   * @returns 
   * @memberof RamDisplayComponent
   */
  getCommand(value : number) {
    let msb =  value >> 4;    
    let lsb = value & 0x0f;
    return this.controlService.getCommandName(msb);
  }


  /**
   * TODO: Not implemented
   * 
   * @memberof MarRamComponent
   */
  onEditRAMclick() {
    let ram = this.store.getState().ram;
    for (let i=0; i< this.ramSize; i++)
      this.editRamValues[i] = this.binPrefix(ram[i].toString(2));
    this.showEditor = true;
  }

  /**
   * Save editted RAM to store
   * 
   * @returns 
   * @memberof RamDisplayComponent
   */
  saveRam() {
    this.showEditor = false;
    let arr = [];
    for (let i=0; i<this.ramSize; i++)
      arr[i] = parseInt(this.editRamValues[i],2);     
    this.ramService.saveRam(arr);
  }

  saveRamInput() {
    let arr = [];
    for (let i=0; i<this.ramSize; i++)
      arr[i] = parseInt(this.ramTable[i][3],2);     
    this.ramService.saveRam(arr);    
  }
  /**
   * A filter to force typing only 1s and 0s (and control keys)
   * 
   * @param {any} e 
   * @returns 
   * @memberof RamDisplayComponent
   */
  onKeyDownEvent(e : any) {
    let len = e.currentTarget.value.length;
    let allowed = ["Digit1", "Numpad1", "Numpad0", "Digit0"];
    let ctrl = ["ArrowLeft", "ArrowRight", "Delete", "Tab", "Backspace"];
    if ((len < 8 && (allowed.indexOf(e.code) != -1)) || (ctrl.indexOf(e.code) !=-1)) {
    }
    else {
      e.stopPropagation();
      return false;
    }
  }

  onRamChanged(event : any) {
    var id = event.currentTarget.id;
    var index = id.substr(id.indexOf("_")+1);
    var value = parseInt(event.currentTarget.value,2);

    this.ramTable[index][2] = this. hexPrefix2(value.toString(16));
    this.ramTable[index][0] = this.getCommand(value) +" "+(value & 0x0F);
    this.ramTable[index][3] = this.binPrefix(value.toString(2));
    this.saveRamInput();
  }

   /**
   * Load canned programs 
   * 
   * @memberof RamDisplayComponent
   */
  loadPrograms() {
    let prgs = this.translateService.get('PROGRAMS').subscribe((res: any) => {
      this.cannedPrograms = [];
      this.cannedPrograms.push({label: res.SELECTOR, value:null});
      this.cannedPrograms.push({label: res.PROG1.TITLE, value:{id:1, ram: res.PROG1.RAM}});
      this.cannedPrograms.push({label: res.PROG2.TITLE, value:{id:1, ram: res.PROG2.RAM}});
      this.cannedPrograms.push({label: res.PROG3.TITLE, value:{id:1, ram: res.PROG3.RAM}});
      this.cannedPrograms.push({label: res.PROG4.TITLE, value:{id:1, ram: res.PROG4.RAM}});
      prgs.unsubscribe();  
    });   
    
  }

  /**
   * Event when user selects a breakpoint
   * 
   * @param {any} event 
   * @memberof RamDisplayComponent
   */
  breakpointSelected(event : any) {
    let v = (this.selectedBpValue == 'none') ? -1 : parseInt(this.selectedBpValue);
    this.store.dispatch(breakPointChange(v));
  }

  /**
   * Handle selection of a canned program
   * 
   * @param {any} event 
   * @memberof RamDisplayComponent
   */
  programSelected(event : any) {
    let ram = event.value.ram.split(',');
    for (let i=0 ; i< ram.length ; i++) {
      ram[i] = this.binPrefix(parseInt(ram[i]).toString(2));
    }    
    this.editRamValues = ram;
  }

  /**
   * Show the micro command table
   * 
   * @memberof RamDisplayComponent
   */
  onMicroCmdsclick() {
    let microCmdsTable = [];
    let cmds  : any = this.controlService.getCommands();
    for (let c in cmds) {
      let mc = this.controlService.getMicroCommands(c);
      let desc = this.controlService.getCommandDescription(c);
      let mcDisplay = '';
      for (let i=0; i<mc.length; i++) {
        if (mc[i] == '')
          break;
        mcDisplay += "<div>"+ i+" "+mc[i]+"</div>";
      }
      // Command name, command value, micro-commands
      microCmdsTable.push( [c, this.binPrefix(cmds[c].toString(2),4),mcDisplay, desc]);
    }    
    this.showMicroCmdsArray = microCmdsTable;
    this.showMicroCmds = true;
  }
}
