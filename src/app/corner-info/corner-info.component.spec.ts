import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CornerInfoComponent } from './corner-info.component';

describe('CornerInfoComponent', () => {
  let component: CornerInfoComponent;
  let fixture: ComponentFixture<CornerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CornerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CornerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
