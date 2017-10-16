/*
 * Project: Eight Bit CPU Emulator
 *
 * A control led that (i.e., HLT, MI, RO...) that shows the state of
 * a control line.
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-control-led',
  templateUrl: './control-led.component.html',
  styleUrls: ['./control-led.component.css']
})
export class ControlLedComponent implements OnInit {

  @Input() type: string;
  @Input() color: string;

  colorInactive = "gray"; // the inactive color
  currentColor : string;
  isActive : boolean = false;

  constructor() {
    this.color = "orange"; // not used. the value is an input
    this.currentColor = this.colorInactive;
   }

  ngOnInit() {
  }

  /**
   * Sets the state (turned on / off)
   * 
   * @param {boolean} active 
   * @memberof ControlLedComponent
   */
  setState( active: boolean) {
    if (active)
      this.currentColor = this.color;
    else  
      this.currentColor = this.colorInactive;
    this.isActive = active;
  }

  getIsActive() : boolean {
    return this.isActive;
  }

}
