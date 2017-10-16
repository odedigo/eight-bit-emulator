import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlWordComponent } from './control-word.component';

describe('ControlWordComponent', () => {
  let component: ControlWordComponent;
  let fixture: ComponentFixture<ControlWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
