import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionRegisterComponent } from './instruction-register.component';

describe('InstructionRegisterComponent', () => {
  let component: InstructionRegisterComponent;
  let fixture: ComponentFixture<InstructionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
