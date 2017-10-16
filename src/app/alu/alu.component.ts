/*
 * Project: Eight Bit CPU Emulator
 *
 * The ALU implements 2 operations: add and subtract
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */

import { Component, OnInit,ViewEncapsulation , ViewChild} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';

@Component({
  selector: 'app-alu',
  templateUrl: './alu.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alu.component.css','../base/base.component.css']
})
export class AluComponent extends BaseComponent implements OnInit {
  @ViewChild ('eo') elementEO : any;
  @ViewChild ('su') elementSU : any;
  @ViewChild ('carry') elementCARRY : any;
  @ViewChild ('alupanel') elementPanel : any;
  
  constructor(private store:AppStore) { 
    super();
  } 

  ngOnInit() {
    super.subscribeToStateChange(this.store);
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof AluComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setControlLedState(this.elementEO, super.cwHas(newState.controlWord,'EO'), false);
    super.setControlLedState(this.elementCARRY, newState.carry, false);
    super.setControlLedState(this.elementSU, super.cwHas(newState.controlWord,'SU'), false);
    super.setLedPanelValue(this.elementPanel, newState.alu);
  }
}
