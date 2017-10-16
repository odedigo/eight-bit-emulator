/*
 * Project: Eight Bit CPU Emulator
 *
 * The bus area. Displays arrows indicating which component inputs 
 * or outputs data from/to the bus
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { ClockService, ClockOptions } from "../services/clock.service";
import { IEmulatorState } from '../store/emulatorTypes';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bus.component.css','../base/base.component.css']
})
export class BusComponent extends BaseComponent implements OnInit {

  // Binds to the elements' display property
  show_co : string = 'none';
  show_mi : string = 'none';
  show_ro : string = 'none';
  show_ri : string = 'none';
  show_io : string = 'none';
  show_ii : string = 'none';
  show_ao : string = 'none';
  show_ai : string = 'none';
  show_eo : string = 'none';
  show_bi : string = 'none';
  show_oi : string = 'none';

  readonly active : string = "inline";  // show
  readonly inactive : string = "none";  // hide
  
  constructor(protected store:AppStore) { 
    super();
    super.subscribeToStateChange(this.store);    
  }

  ngOnInit() {
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof BusComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    this.show_co  = super.cwHas(newState.controlWord,'CO') ? this.active : this.inactive;
    this.show_mi  = super.cwHas(newState.controlWord,'MI') ? this.active : this.inactive;
    this.show_ro  = super.cwHas(newState.controlWord,'RO') ? this.active : this.inactive;
    this.show_ri  = super.cwHas(newState.controlWord,'RI') ? this.active : this.inactive;
    this.show_io  = super.cwHas(newState.controlWord,'IO') ? this.active : this.inactive;
    this.show_ii  = super.cwHas(newState.controlWord,'II') ? this.active : this.inactive;
    this.show_ao  = super.cwHas(newState.controlWord,'AO') ? this.active : this.inactive;
    this.show_ai  = super.cwHas(newState.controlWord,'AI') ? this.active : this.inactive;
    this.show_eo  = super.cwHas(newState.controlWord,'EO') ? this.active : this.inactive;
    this.show_bi  = super.cwHas(newState.controlWord,'BI') ? this.active : this.inactive;
    this.show_oi  = super.cwHas(newState.controlWord,'OI') ? this.active : this.inactive;    
  }
}
