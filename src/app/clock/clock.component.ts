/*
 * Project: Eight Bit CPU Emulator
 *
 * The Clock component allows users to change how the computer's clock is triggered.
 * It supports 2 modes:
 * 1. Automatic clock events sent on the selected pace
 * 2. Manual clock event when button is pressed
 * 
 * The clock module actually sends 2 events. The first for a rising edge and the latter
 * for a falling edge. 
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */

import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import {SelectItem} from 'primeng/primeng';
import { AppStore } from '../store/emulatorStore';
import {Observable, Subscription } from 'rxjs/Rx';
import { ClockService } from "../services/clock.service";
import { ResetService } from '../services/reset.service';
import { IEmulatorState } from '../store/emulatorTypes';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./clock.component.css','../base/base.component.css']
})

export class ClockComponent extends BaseComponent implements OnInit {
  @ViewChild ('hlt') elementHLT : any;
  
  isAutoClockPaused  : boolean         = true;
  paces               : SelectItem[]    = [];
  selectClkPace       : string          = "5000"; // default value
  paceDisabled        : boolean         = false;
  manualPulseDisabled : boolean         = false;
  autoPulseDisabled   : boolean         = false;
  resetDisabled       : boolean         = false;

  animationClass : string = "glow";
  resetAnimationClass : string = "";
  activeHLT   : boolean = false;
  
  /**
   * Constructor
   * 
   * @param store the global store (injected)
   */
  constructor(protected store:AppStore, private clkService: ClockService,
              private reserService : ResetService, private resetService : ResetService,
              protected translate : TranslateService) { 
    super();

    let trs = this.translate.get('COMP.CLOCK.PACES').subscribe((res: any) => {      
      var val = this.extractDropdownValues(res.SLOWER);
      this.paces.push({label:val[0], value: val[1]});
      var val = this.extractDropdownValues(res.SLOW);
      this.paces.push({label:val[0], value: val[1]});
      var val = this.extractDropdownValues(res.NORMAL);
      this.paces.push({label:val[0], value: val[1]});
      var val = this.extractDropdownValues(res.FAST);
      this.paces.push({label:val[0], value: val[1]});
      var val = this.extractDropdownValues(res.FASTER);
      this.paces.push({label:val[0], value: val[1]});
      this.selectClkPace = val[1].toString();  
      trs.unsubscribe();
    });
  }

  extractDropdownValues(val:string) : any [] {
    var sep = val.indexOf("|");
    if (sep == -1)
      return ["",""];
    var text = val.substr(0,sep);
    var value = parseInt(val.substr(sep+1));
    return [text,value];
  }

  ngOnInit() {
    super.setControlLedState(this.elementHLT, this.activeHLT, false);
    super.subscribeToReset(this.reserService);
    super.subscribeToStateChange(this.store);    
    this.doFirstRun();       
    this.selectClkPace = "5000";  
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof AluComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setControlLedState(this.elementHLT, super.cwHas(newState.controlWord,'HLT'), false);
    if (this.elementHLT.getIsActive()) {
      this.stopTimer();
      this.isAutoClockPaused = true;
      this.manualPulseDisabled = true;
      this.autoPulseDisabled = true;
      this.resetDisabled = false;
      this.resetAnimationClass = 'glow';
    }
  } 

  /**
   * Generate a manual clock pulse
   * 
   * @memberof ClockComponent
   */
  onManualClock() {
    if (this.elementHLT.getIsActive())
      return;
    this.clkService.manualClock(20);
    this.animationClass = '';
  }

  /**
   * After a reset, if the mode is Auto, we restart the clock
   * 
   * @param {any} event 
   * @memberof ClockComponent
   */
  handleResetEvent(event : any) { 
    this.resetAnimationClass = '';
    this.autoPulseDisabled = false;
    this.manualPulseDisabled = false;
    if ( !this.isAutoClockPaused) {
      this.startTimer();
    }
  }

  /**
   * Called when the use toggles the clock mode between Auto / Manual.
   * We first handle the UI (enabling and disabling compoenents) and
   * then handle the timer
   * 
   * @param event the onChange event of toggleButton
   */
  onClockModeChange(event : any) {    
    this.animationClass = '';
    var isChecked = event.checked;// && !this.elementHLT.getIsActive();
    if (isChecked) {
      this.manualPulseDisabled = false;
      this.isAutoClockPaused = true;
      this.resetDisabled = false;
    }
    else {
      this.animationClass = '';      
      this.manualPulseDisabled = true;      
      this.isAutoClockPaused = false;
      this.resetDisabled = true;      
    }
    if (this.elementHLT.getIsActive())
      this.manualPulseDisabled = false;
    this.onPaceChange(event);
  }

  /**
   * Called when the pace (timer delay) changed by the user
   * This is enabled only when Auto mode is selected
   * 
   * @param event the onChange event of dropdown
   */
  onPaceChange(event : any) {
    this.stopTimer();
    if (!this.isAutoClockPaused) { // auto mode
        this.startTimer();
    }
  }

  /**
   * Start the timer and subscribe for its events
   */
  startTimer() {
    if (this.elementHLT.getIsActive())
      return;
    this.clkService.startClock(parseInt(this.selectClkPace));
  }

  /**
   * Stop the timer and destroy it
   */
  stopTimer() {
    this.clkService.stopClock();
  }

    /**
   * Triggers a reset event
   * 
   * @memberof BusValueComponent
   */
  onResetClicked() {
    this.resetService.reset();
  }

  doFirstRun() {
    
  }
  
}

 