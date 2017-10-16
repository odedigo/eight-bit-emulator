/*
 * Project: Eight Bit CPU Emulator
 *
 *
 *
 * @git: https://github.com/odedigo/EightBitCpuEmulator.git
 * @last-modified: Tue Oct 03 2017
 * @author: Oded Cnaan (oded.8bit@gmail.com)
 */
import { Component, OnInit } from '@angular/core';
import { MainEmulator } from '../services/main-emulator';
import { AppStore } from "../store/emulatorStore";
import { ClockService } from "../services/clock.service";
import { ResetService } from "../services/reset.service";
import { ControlTableService } from '../services/control-table.service';
import { RamChangesService } from "../services/ram-changes.service";
import {TranslateService} from 'ng2-translate';
import { languageChange } from '../store/emulatorActions';

@Component({
  selector: 'app-emulator',
  templateUrl: './emulator.component.html',
  styleUrls: ['./emulator.component.css']
})
export class EmulatorComponent implements OnInit {

  emulator : MainEmulator;
  
    constructor(private store          : AppStore, 
                private clkService     : ClockService,
                private resetService   : ResetService,
                private controlService : ControlTableService,
                private ramService     : RamChangesService,
                private translate      : TranslateService) {
 
      store.dispatch(languageChange(translate.currentLang));
      //this.htmlDir = store.getHtmlDirection();

      // The Emulator logic
      this.emulator = new MainEmulator(store, clkService, resetService, controlService, ramService);
    }
  

  ngOnInit() {
  }

}
