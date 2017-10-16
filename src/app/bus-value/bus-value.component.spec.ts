import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusValueComponent } from './bus-value.component';

describe('BusValueComponent', () => {
  let component: BusValueComponent;
  let fixture: ComponentFixture<BusValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
