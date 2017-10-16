/*
 * Project: Eight Bit CPU Emulator
 *
 * Memory Address Register (MAR) and RAM
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, ViewEncapsulation ,ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ClockService, ClockOptions } from "../services/clock.service";
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { ResetService } from "../services/reset.service";

@Component({
  selector: 'app-mar-ram',
  templateUrl: './mar-ram.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mar-ram.component.css','../base/base.component.css']
})
export class MarRamComponent extends BaseComponent implements OnInit {
  @ViewChild ('mi') elementMI : any;
  @ViewChild ('ri') elementRI : any;
  @ViewChild ('ro') elementRO : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('lpanel_mar') elementPanelMar : any;
  @ViewChild ('lpanel_ram') elementPanelRam : any;

  miActive   : boolean = false;
  riActive   : boolean = false;
  roActive   : boolean = false;
  
  constructor(protected store:AppStore, 
              private resetService : ResetService,
              private clkService     : ClockService) { 
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

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof MarRamComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanelMar, newState.mar);
    super.setLedPanelValue(this.elementPanelRam, newState.ramValue());
    super.setControlLedState(this.elementMI, super.cwHas(newState.controlWord,'MI'), false);
    super.setControlLedState(this.elementRI, super.cwHas(newState.controlWord,'RI'), false);
    super.setControlLedState(this.elementRO, super.cwHas(newState.controlWord,'RO'), false);    
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
