import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputRegisterComponent } from './output-register.component';

describe('OutputRegisterComponent', () => {
  let component: OutputRegisterComponent;
  let fixture: ComponentFixture<OutputRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
