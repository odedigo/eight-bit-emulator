/*
 * Project: Eight Bit CPU Emulator
 *
 * A led panel has 2 parts, Binary and a Decimal representations
 * of its value
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Sep 26 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-led-panel',
  templateUrl: './led-panel.component.html',
  styleUrls: ['./led-panel.component.css']
})
export class LedPanelComponent implements OnInit {

  @Input() leds:string[];
  @Input() caption: string;
  @Input() showCaption: string;
  @Input() showScreen: string;
  @Input() valueScreen: string;
  @Input() marginLeft : string;
  @Input() showCW : string;  
  

  numLeds       : number    = 0;
  controlwords  : string[]  = ['HLT','MI','RI','RO','II','IO','AI','AO','BI','EO','SU','OI','JMP','JC','CE','CO']
  panelHeight   : string    = "30px";
  value         : number;
  maxValue      : number;
  currentColor  : string;
  binaryValues  : string[]  =[];
  ledClass      : string    = "led";
  
  constructor() { 
    this.showCaption = "inline";
    this.showScreen = "inline";
    this.valueScreen = "0";
    this.marginLeft = "1px";
    this.showCW = "none";  
    this.maxValue = 0;
    this.currentColor = "gray";
  }

  ngOnInit() {  
    if (this.showCW != "none")
      this.panelHeight = "65px";
    this.numLeds = this.leds.length;
    if (this.numLeds == 16)
      this.ledClass += " led_rect";
    // Create an array of current state that is binded to the HTML element
    for (var index = 0; index < this.numLeds; index++) {
      this.binaryValues.push(this.currentColor)
    }
    this.maxValue = Math.pow(2, this.numLeds) - 1;
    if (this.maxValue == 7)
      this.valueScreen = "0";
    else if (this.maxValue == 15)
      this.valueScreen = "00";
    else 
    this.valueScreen = "000";

    this.value = parseInt(this.valueScreen);
    if (this.value > 255 || this.value < 0)
      console.error('[led-panel] Value '+this.valueScreen+" is not in range");
  }

  /**
   * Sets a new value
   * 
   * @param {number} newValue 
   * @memberof LedPanelComponent
   */
  setValue(newValue : number) {
    if (newValue >= 0 && newValue <= this.maxValue) {
      this.valueScreen = this.leadingZeros(newValue);
      var base2 = newValue.toString(2); // convert to base 2
      var numZeros = (this.numLeds - base2.length);
      for (var index = 0; index < numZeros ; index++) {
        base2 = "0"+base2;
      }
      
      for (var i = 0; i < this.numLeds ; i++) {
        if (base2.charAt(i) == '1') {
          this.binaryValues[i] = this.leds[i];
        }
        else {
          this.binaryValues[i] = this.currentColor;
        }
      }
    }
    else {
      console.error("led-panel: Value "+newValue+" not in range. Max value is "+this.maxValue);
    } 
  }

  /**
   * Add leading zeros to the number
   * 
   * @param {number} value 
   * @returns {string} 
   * @memberof LedPanelComponent
   */
  leadingZeros(value : number) : string {
    if (this.maxValue == 7) { // 1 digits
      return value.toString();
    }
    else if (this.maxValue == 15) { // 2 digits
        if (value < 10)
          return "0"+value;
        return value.toString();
    }
    else { // 3 digit
      if (value < 10)
        return "00"+value;
      else if (value < 100)
        return "0"+value;
      return value.toString();
}
  }

}
