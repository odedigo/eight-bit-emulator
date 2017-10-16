/*
 * Project: Eight Bit CPU Emulator
 *
 * Displays the bus value
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, ViewEncapsulation , ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';

@Component({
  selector: 'app-bus-value',
  templateUrl: './bus-value.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bus-value.component.css','../base/base.component.css']
})
export class BusValueComponent extends BaseComponent implements OnInit {
  @ViewChild ('buspanel') elementPanel : any;
  

  constructor(protected store:AppStore) { 
    super();
  }

  ngOnInit() {
    super.subscribeToStateChange(this.store);
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof BusValueComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {  
    super.setLedPanelValue(this.elementPanel, newState.busValue);
  }

}
