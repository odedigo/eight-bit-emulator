/*
 * Project: Eight Bit CPU Emulator
 *
 * Register B
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit,ViewEncapsulation ,ViewChild} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { ResetService } from "../services/reset.service";
import { ClockService, ClockOptions } from "../services/clock.service";

@Component({
  selector: 'app-register-b',
  templateUrl: './register-b.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./register-b.component.css','../base/base.component.css']
})
export class RegisterBComponent extends BaseComponent implements OnInit {
  @ViewChild ('bi') elementBI : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('regbpanel') elementPanel : any;

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
   * @memberof RegisterBComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanel, newState.regb);
    super.setControlLedState(this.elementBI, super.cwHas(newState.controlWord,'BI'), false);
  }

  /**
   * Handle clock events
   * 
   * @param {any} event 
   * @memberof MainEmulator
   */
  handleClockEvent(event : any) {
    if (event == ClockOptions.rising)
      super.setControlLedState(this.elementClk, true , true);      
  }
}
