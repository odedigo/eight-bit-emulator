import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBComponent } from './register-b.component';

describe('RegisterBComponent', () => {
  let component: RegisterBComponent;
  let fixture: ComponentFixture<RegisterBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
