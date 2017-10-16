import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlLedComponent } from './control-led.component';

describe('ControlLedComponent', () => {
  let component: ControlLedComponent;
  let fixture: ComponentFixture<ControlLedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlLedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlLedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
