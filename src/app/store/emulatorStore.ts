/*
 * Project: Eight Bit CPU Emulator
 *
 * The Store - holds the current application state.
 * You can subscribe for change events
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Sat Sep 23 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Injectable } from '@angular/core';
import { reducer } from './emulatorReducer';
import { initialEmulatorState, IEmulatorState, Action } from './emulatorTypes';
import { IListenerCallback, IUnsubscribeCallback } from './storeListeners';
import { ALL_EVENTS } from './emulatorActions';

export interface Reducer<T> {
  (state: T, action: Action): T;
}

export interface IListener {
  selector : string,
  listener : IListenerCallback
}

/**
 * A template class for a store
 * 
 * @class Store
 * @template T 
 */
@Injectable()
export class Store<T> {
    private _state: T; 
    private _listeners: IListener[] = [];
    private _sendSpecificEvents : boolean = false;

    constructor(
      private reducer: Reducer<T>,
      initialState: T
    ) {
      this._state = initialState;
    }
   
    /**
     * Sets the flag
     * 
     * @param {boolean} send 
     * @memberof Store
     */
    setSendSpecificEvents( send : boolean) {
      this._sendSpecificEvents = send;
    }

    /**
     * Get current state
     * 
     * @returns {T} 
     * @memberof Store
     */
    getState(): T {
      return this._state;
    }

    /**
     * Dispatch an action. After executing the reducer and getting a new state,
     * it informs all subscribers ofthe change
     * 
     * @param {Action} action 
     * @memberof Store
     */
    dispatch(action: Action): void {
      this._state = this.reducer(this._state, action);      
      this._listeners.forEach((listener: IListener) => { 
        // if this is not an ALL_EVENTS update, and components don't need to 
        // get specific updates, turn it into ALL_EVENTS event
        if (action.type != ALL_EVENTS && !this._sendSpecificEvents) {
          action.type = ALL_EVENTS;
          action.payload = this._state;
        }
        // If the listener subscribed for ALL_EVENTS (selector), we send it 
        // every change
        if (listener.selector == action.type || listener.selector == ALL_EVENTS) 
          listener.listener(action.payload)
        
      });
    }

    /**
     * Subscribe for store changes
     * Example:
     *     var unsub = store.subscribe(CONTROL_WORD_CHANGE, (newState) =>
     *         this.handleControlWordEvent(newState)
     *     );
     * 
     *     // The event handler
     *     handleControlWordEvent(newState) {}
     * 
     *     // Unsubscribe
     *     unsub();
     * 
     * @param {string} selector 
     * @param {IListenerCallback} listener 
     * @returns {IUnsubscribeCallback} 
     * @memberof Store
     */
    subscribe( selector : string, listener: IListenerCallback): IUnsubscribeCallback {
      this._listeners.push({selector,listener});
      return () => { // returns an "unsubscribe" function
        this._listeners = this._listeners.filter(l => l.listener !== listener && l.selector != selector);
      };
    }
  }


  /**
   * The actual AppStore class
   * 
   * @export
   * @class AppStore
   * @extends {Store<IEmulatorState>}
   */
  @Injectable() 
  export class AppStore extends Store<IEmulatorState> {
      constructor() {
          super(reducer, initialEmulatorState);
      }

      /**
       * Gets interface language
       * 
       * @returns {string} 
       * @memberof AppStore
       */
      getLanguage() : string {
        return super.getState().language;
      }

      /**
       * Gets interface language direction
       * 
       * @returns {string} 
       * @memberof AppStore
       */
      getHtmlDirection() : string {
        return (super.getState().language == 'he') ? 'rtl' : 'ltr';
      }

  }