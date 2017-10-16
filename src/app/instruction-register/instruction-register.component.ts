/*
 * Project: Eight Bit CPU Emulator
 *
 *
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Oct 03 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { ClockService, ClockOptions } from "../services/clock.service";
import { IEmulatorState } from '../store/emulatorTypes';
import { ResetService } from "../services/reset.service";

@Component({
  selector: 'app-instruction-register',
  templateUrl: './instruction-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./instruction-register.component.css','../base/base.component.css']
})
export class InstructionRegisterComponent extends BaseComponent implements OnInit {
  @ViewChild ('ii') elementII : any;
  @ViewChild ('io') elementIO : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('inspanel') elementPanel : any;

  constructor(protected store:AppStore, 
              private resetService : ResetService,
              private clkService : ClockService) { 
    super();
  }

  ngOnInit() {
    super.subscribeToStateChange(this.store);
    super.subscribeToReset(this.resetService);  
    super.subscribeToClock(this.clkService);
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

  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setControlLedState(this.elementII, super.cwHas(newState.controlWord,'II'), false);
    super.setControlLedState(this.elementIO, super.cwHas(newState.controlWord,'IO'), false);
    super.setLedPanelValue(this.elementPanel, newState.instruction);
  }

  /**
     * Clock events
     * 
     * @param {any} event 
     * @memberof MainEmulator
     */
    handleClockEvent(event : any) {
      if (event == ClockOptions.rising)
        super.setControlLedState(this.elementClk, true , true);      
    }
}
