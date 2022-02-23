import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextHandlerComponent } from './form-text-handler.component';

describe('FormTextHandlerComponent', () => {
  let component: FormTextHandlerComponent;
  let fixture: ComponentFixture<FormTextHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTextHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
