/*
 * Project: Eight Bit CPU Emulator
 *
 * The logic component manages the translation of (1) the current instruction in the
 * Instuction Register (2) the current micro command step to turn on and off
 * the control lines
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */

import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Observable } from 'rxjs/Observable';
import { ResetService } from "../services/reset.service";
import { AppStore } from '../store/emulatorStore';
import { busValueChange } from '../store/emulatorActions';
import { ControlTableService } from '../services/control-table.service';
import { IEmulatorState } from '../store/emulatorTypes';
import { ClockService, ClockOptions } from "../services/clock.service";

@Component({
  selector: 'app-logic',
  templateUrl: './logic.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./logic.component.css','../base/base.component.css']
})
export class LogicComponent extends BaseComponent implements OnInit {
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('steppanel') elementPanel : any;
 
  constructor(private store          : AppStore, 
              private resetService   : ResetService,
              private clkService     : ClockService) { 
    super();
  } 

  /**
   * Subscribe to events and update the store
   * 
   * @memberof LogicComponent
   */
  ngOnInit() {
    super.subscribeToStateChange(this.store);
    super.subscribeToReset(this.resetService);
    super.subscribeToClock(this.clkService);
  }

  /**
   * TODO: Allow editing the translation table tht defines the assembler commands
   * 
   * @memberof LogicComponent
   */
  onEditLogicClick() {
    alert("NOT IMPLEMENTED");
  }

  /**
   * Handle reset events
   * Resets Step value
   * 
   * @param {any} item 
   * @memberof LogicComponent
   */
  handleResetEvent(item : any) {
    super.setControlLedState(this.elementReset, true , true);
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof LogicComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanel, newState.stepValue);
  }

  /**
   * Clock events
   * 
   * @param {any} event 
   * @memberof MainEmulator
   */
  handleClockEvent(event : any) {
    if (event == ClockOptions.falling)
      super.setControlLedState(this.elementClk, true , true);      
  }
}
