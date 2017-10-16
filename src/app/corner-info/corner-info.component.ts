import { Component, OnInit } from '@angular/core';
import { AppStore } from '../store/emulatorStore';

@Component({
  selector: 'app-corner-info',
  templateUrl: './corner-info.component.html',
  styleUrls: ['./corner-info.component.css']
})
export class CornerInfoComponent implements OnInit {

  maxWidth : number;
  htmlDir  : string;
  langClass     : string;
  textDir       : string;
  showbox       : boolean = false;

  constructor(protected store:AppStore) { 
      let getWindow = () => {
        return window.innerWidth;
      };

      window.onresize = () => {
        let w = getWindow();
        if (w > 600)
          this.maxWidth = 500;
        else
          this.maxWidth = 2 * getWindow() / 3;
        //ChangeDetectorRef
        //this.cdr.detectChanges(); //running change detection manually
      };
  }

  ngOnInit() {
    this.htmlDir = this.store.getHtmlDirection();
    this.langClass = (this.htmlDir == 'rtl') ? 'ui-rtl' : '';
    this.textDir   = (this.htmlDir == 'rtl') ? 'right' : 'left';
  }

}
