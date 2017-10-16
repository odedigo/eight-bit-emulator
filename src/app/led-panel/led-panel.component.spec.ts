import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedPanelComponent } from './led-panel.component';

describe('LedPanelComponent', () => {
  let component: LedPanelComponent;
  let fixture: ComponentFixture<LedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
