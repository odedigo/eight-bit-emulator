/*
 * Project: Eight Bit CPU Emulator
 *
 * Register A - a computer register holding 8 bits of data
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Observable } from 'rxjs/Observable';
import { AppModule } from "../app.module";
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { ResetService } from "../services/reset.service";
import { ClockService, ClockOptions } from "../services/clock.service";

@Component({
  selector: 'app-register-a',
  templateUrl: './register-a.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./register-a.component.css','../base/base.component.css']
})

export class RegisterAComponent extends BaseComponent implements OnInit {
  // Allow access to the DOM elements
  @ViewChild ('ai') elementAI : any;
  @ViewChild ('ao') elementAO : any;
  @ViewChild ('clk') elementClk : any;
  @ViewChild ('rst') elementReset : any;
  @ViewChild ('regapanel') elementPanel : any;
  
  /**
   * Constructor
   * Subscribe to the relevant store events
   * 
   * @param store the global store (injected)
   */
  constructor(protected store:AppStore, 
              private resetService : ResetService,
              private clkService : ClockService) { 
    super();      
  }

  /**
   * Set initial state of UI elements
   */
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
   * @memberof RegisterAComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanel, newState.rega);
    super.setControlLedState(this.elementAI, super.cwHas(newState.controlWord,'AI'), false);
    super.setControlLedState(this.elementAO, super.cwHas(newState.controlWord,'AO'), false);
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
