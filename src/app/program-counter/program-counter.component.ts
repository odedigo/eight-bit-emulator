/*
 * Project: Eight Bit CPU Emulator
 *
 * Program Counter
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
  selector: 'app-program-counter',
  templateUrl: './program-counter.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./program-counter.component.css','../base/base.component.css']
})


export class ProgramCounterComponent extends BaseComponent implements OnInit {
  @ViewChild ('ce') elementCE : any;
  @ViewChild ('co') elementCO : any;
  @ViewChild ('jmp') elementJMP : any;
  @ViewChild ('jc') elementJC : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('pcpanel') elementPanel : any;

  private programCounterValue : number = 0;
  
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
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof ProgramCounterComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {     
    super.setLedPanelValue(this.elementPanel, newState.counter);
    super.setControlLedState(this.elementCE, super.cwHas(newState.controlWord,'CE'), false);
    super.setControlLedState(this.elementCO, super.cwHas(newState.controlWord,'CO'), false);
    super.setControlLedState(this.elementJMP, super.cwHas(newState.controlWord,'JMP'), false);
    super.setControlLedState(this.elementJC, super.cwHas(newState.controlWord,'JC'), false);
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
