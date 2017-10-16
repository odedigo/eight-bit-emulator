import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmulatorComponent } from './src/app/emulator/emulator.component';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ProgramCounterComponent } from './src/app/program-counter/program-counter.component';
import { BaseComponent } from './src/app/base/base.component';
import { LedComponent } from './src/app/led/led.component';
import { ControlLedComponent } from './src/app/control-led/control-led.component';
import { LedPanelComponent } from './src/app/led-panel/led-panel.component';
import { MarRamComponent } from './src/app/mar-ram/mar-ram.component';
import { InstructionRegisterComponent } from './src/app/instruction-register/instruction-register.component';
import { LogicComponent } from './src/app/logic/logic.component';
import { RegisterAComponent } from './src/app/register-a/register-a.component';
import { RegisterBComponent } from './src/app/register-b/register-b.component';
import { AluComponent } from './src/app/alu/alu.component';
import { OutputRegisterComponent } from './src/app/output-register/output-register.component';
import { ClockComponent } from './src/app/clock/clock.component';
import { ControlWordComponent } from './src/app/control-word/control-word.component';
import { BusComponent } from './src/app/bus/bus.component';
import { BusValueComponent } from './src/app/bus-value/bus-value.component';
import { RamDisplayComponent } from './src/app/ram-display/ram-display.component';
import { CornerInfoComponent } from './src/app/corner-info/corner-info.component';

// Services
import { ClockService } from "./src/app/services/clock.service";
import { ResetService } from "./src/app/services/reset.service";
import { ControlTableService } from './src/app/services/control-table.service';
import { RamChangesService } from './src/app/services/ram-changes.service';

// App Store
import { AppStore } from "./src/app/store/emulatorStore";

// Main emulator class
import { MainEmulator } from './src/app/services/main-emulator';

// Translation
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate';

// PrimeNG
import { ButtonModule, ToggleButtonModule, DropdownModule, InputSwitchModule } from 'primeng/primeng';
import {TooltipModule, OverlayPanelModule, DialogModule, InputMaskModule } from 'primeng/primeng';
import {RadioButtonModule, AccordionModule, InputTextModule} from 'primeng/primeng';

export function httpFactory(http: Http) {
  return new TranslateStaticLoader(http, './src/app/assets/i18n', '.json');
}
@NgModule({
  declarations: [
    ProgramCounterComponent,
    BaseComponent,
    LedComponent,
    ControlLedComponent,
    LedPanelComponent,
    MarRamComponent,
    InstructionRegisterComponent,
    LogicComponent,
    RegisterAComponent,
    RegisterBComponent,
    AluComponent,
    OutputRegisterComponent,
    ClockComponent,
    ControlWordComponent,
    BusComponent,
    BusValueComponent,
    RamDisplayComponent,
    EmulatorComponent,
    CornerInfoComponent    
  ],    
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    OverlayPanelModule,
    ToggleButtonModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    // Translate
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: httpFactory,
      deps: [Http]
    })
    
  ]
  //exports: [EmulatorComponent],
})
export class OcEmulatorModule { }
