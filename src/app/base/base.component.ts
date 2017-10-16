/**
 * The base class for all components
 * Contains some generic definitions used in multiple components
 * 
 * @Written by: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit , OnDestroy} from '@angular/core';
import { ControlLedComponent } from "../control-led/control-led.component";
import { LedPanelComponent } from "../led-panel/led-panel.component";
import { Subscription } from "rxjs";
import { ClockService, ClockOptions } from "../services/clock.service";
import { ResetService } from "../services/reset.service";
import { CONTROL_WORD_CHANGE, BUS_VALUE_CHANGE, STEP_VALUE_CHANGE, INSTRUCTION_VALUE_CHANGE,
         REGA_VALUE_CHANGE, REGB_VALUE_CHANGE, MAR_VALUE_CHANGE, ALL_EVENTS,
         busValueChange, instructionValueChange, stepValueChange, controlWordChange,
         regAValueChange, regBValueChange, marValueChange } from '../store/emulatorActions';
import { AppStore } from '../store/emulatorStore';
import { IEmulatorState } from '../store/emulatorTypes';
import { IUnsubscribeCallback } from '../store/storeListeners';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  // Led panel options
  readonly  leds8             : string[] = ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red']
  readonly  leds8_output      : string[] = ['orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange', 'orange']
  readonly  leds8_instruction : string[] = ['blue', 'blue', 'blue', 'blue', 'green', 'green', 'green', 'green']
  readonly  leds4             : string[] = ['blue', 'blue', 'blue', 'blue']
  readonly  leds4_counter     : string[] = ['green', 'green', 'green', 'green']
  readonly  leds3             : string[] = ['yellow', 'yellow', 'yellow']
  readonly  leds16            : string[] = ['red', 'blue', 'blue','blue', 'green', 'green','yellow', 'yellow','yellow', 'yellow', 'yellow', 'purple', 
                                            'orange','orange', 'orange', 'orange']
  readonly  leds0             : string[] = []  

  // Info
  showInfo : boolean = false; 

  // Colors definitions
  readonly  colorClkButton    : string   = "#093309";
  readonly  colorResetButton  : string   = "black";
  readonly  colorInactive     : string   = "gray";  

  // Timeout
  readonly  blinkDelay        : number   = 800;

  // Subscription
  ClassSubscription : Subscription[] = [];
  StoreSubscriptions : IUnsubscribeCallback[] = [];

  constructor() { 
  }

  ngOnInit() {
    
  }

  myVistualFunction() {
  }

  /**
   * Unsubscribe automatically from all store listeners
   * 
   * @memberof BaseComponent
   */
  ngOnDestroy() {
    for (var i=0 ; i < this.ClassSubscription.length ; i++) {
      this.ClassSubscription[i].unsubscribe();
    }
    for (var i=0 ; i < this.StoreSubscriptions.length ; i++) {
      this.StoreSubscriptions[i]();
    }
  }

  ///////////////////////////////////// Element Manipulations /////////////////////////////////

  /**
   * Sets the value of the led pabel
   * 
   * @param {LedPanelComponent} panel 
   * @param {number} value 
   * @memberof BaseComponent
   */
  setLedPanelValue(panel : LedPanelComponent, value : number) {
    if (panel == null || value == null)
      return;
    panel.setValue(value);
  }

  /**
   * Subscribe for control word chanegs
   * 
   * @param {ControlLedComponent} element the ControlLed component
   * @param {boolean} state true to turn on, false for off
   * @param {boolean} blink if true, the led will be turned off after a constant time
   * @memberof BaseComponent
   */
  setControlLedState(element : ControlLedComponent, state : boolean, blink : boolean) {
      if (element == null) {
        return;
      }
      element.setState(state);
      if (blink) {
        setTimeout(() => {
          element.setState(false);
        }, this.blinkDelay);
      }
  }

  cwHas(cw : string , led : string) : boolean {
    if (cw == null)
      return false;
    return (cw.indexOf(led.toUpperCase()) != -1);
  }

  ///////////////////////////////////// Subscriptions to Services /////////////////////////////////

  /**
   * Subscribe for reset events
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @param {ResetService} resetService 
   * @memberof BaseComponent
   */
  subscribeToReset(resetService : ResetService) {
    var s = resetService.getResetEmitter().subscribe((item:any) => this.handleResetEvent(item));    
    this.ClassSubscription.push(s);
  }

  /**
   * @override Reset event
   * 
   * @param {any} item 
   * @memberof BaseComponent
   */
  handleResetEvent(item : any) {}

  /**
   * Subscribe for clock events. Override 'handleClockEvent(event)' to handle the events
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @param {ClockService} clkService 
   * @memberof BaseComponent
   */
  subscribeToClock(clkService : ClockService) {
    var s = clkService.getClkChangeEmitter().subscribe((item:any) => this.handleClockEvent(item));
    this.ClassSubscription.push(s);
  }

  /**
   * @override Clock event
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleClockEvent(event : any) { }

  ///////////////////////////////////// Subscriptions to Store /////////////////////////////////

  /**
   * Subscribe for state changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToStateChange(store:AppStore) {
    var s = store.subscribe(ALL_EVENTS, (newState) =>
      this.handleStateChangeEvent(newState)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override CW event
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleStateChangeEvent(newState : any) {  }


  /**
   * Subscribe for control word changes. Override 'handleControlWordEvent(event)' to handle changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToControlWord(store:AppStore) {
    var s = store.subscribe(CONTROL_WORD_CHANGE, (value) =>
      this.handleControlWordEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override CW event
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleControlWordEvent(event : any) {
  }

  /**
   * Subscribe to instruction register changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToInstructionChanges(store:AppStore) {
    var s = store.subscribe(INSTRUCTION_VALUE_CHANGE, (value) =>
      this.handleInstructionEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override Instruction event
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleInstructionEvent(event : any) {}

  /**
   * Subscribe to bus value changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToBusValue(store:AppStore) {
    var s = store.subscribe(BUS_VALUE_CHANGE, (value) =>
      this.handleBusEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override Bus event
   * 
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleBusEvent(event : any) {}

  /**
   * Subscribe to reg a value changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToRegAValue(store:AppStore) {
    var s = store.subscribe(REGA_VALUE_CHANGE, (value) =>
      this.handleRegAEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override Reg A event
   * 
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleRegAEvent(event : any) {}

  /**
   * Subscribe to reg b value changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToRegBValue(store:AppStore) {
    var s = store.subscribe(REGB_VALUE_CHANGE, (value) =>
      this.handleRegBEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override Reg B event
   * 
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleRegBEvent(event : any) {}

    /**
   * Subscribe to MAR value changes
   * 
   * @param {Store<fromRoot.EmulatorState>} store 
   * @memberof BaseComponent
   */
  subscribeToMarValue(store:AppStore) {
    var s = store.subscribe(MAR_VALUE_CHANGE, (value) =>
      this.handleMarEvent(value)
    );
    this.StoreSubscriptions.push(s);
  }

  /**
   * @override MAR event
   * 
   * 
   * @param {any} event 
   * @memberof BaseComponent
   */
  handleMarEvent(event : any) {}

}
 
