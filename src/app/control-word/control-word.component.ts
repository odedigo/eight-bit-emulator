/*
 * Project: Eight Bit CPU Emulator
 *
 * The control word component displays which control lines are active at
 * each step
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, ViewEncapsulation , ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { ControlTableService } from '../services/control-table.service';

@Component({
  selector: 'app-control-word',
  templateUrl: './control-word.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./control-word.component.css','../base/base.component.css']
})
export class ControlWordComponent extends BaseComponent implements OnInit {
  @ViewChild ('lpanel') elementPanel : any;
  
  constructor(protected store:AppStore, private ctrlTableService : ControlTableService) { 
    super();
  }

  ngOnInit() {
    super.subscribeToStateChange(this.store);    
  }

  /**
   * Handle state changes
   * 
   * @param {IEmulatorState} newState 
   * @memberof ControlWordComponent
   */
  handleStateChangeEvent(newState : IEmulatorState) {      
    var cw = this.ctrlTableService.translateControlWord(newState.controlWord);
    super.setLedPanelValue(this.elementPanel, cw);
  }

} 
