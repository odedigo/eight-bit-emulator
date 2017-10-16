import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCounterComponent } from './program-counter.component';

describe('ProgramCounterComponent', () => {
  let component: ProgramCounterComponent;
  let fixture: ComponentFixture<ProgramCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
