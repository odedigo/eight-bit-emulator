import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarRamComponent } from './mar-ram.component';

describe('MarRamComponent', () => {
  let component: MarRamComponent;
  let fixture: ComponentFixture<MarRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
