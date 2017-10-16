/*
 * Project: Eight Bit CPU Emulator
 *
 * Output register and display
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, ViewEncapsulation ,ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { ResetService } from "../services/reset.service";
import { ClockService, ClockOptions } from "../services/clock.service";

@Component({
  selector: 'app-output-register',
  templateUrl: './output-register.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./output-register.component.css','../base/base.component.css']
})
export class OutputRegisterComponent extends BaseComponent implements OnInit {
  @ViewChild ('oi') elementOI : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('outpanel') elementPanel : any;

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

  /**
   * Handle state chanegs
   * 
   * @param {IEmulatorState} newState 
   * @memberof OutputRegisterComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanel, newState.out);
    super.setControlLedState(this.elementOI, super.cwHas(newState.controlWord,'OI'), false);
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
