import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPhotoHandlerComponent } from './member-photo-handler.component';

describe('MemberPhotoHandlerComponent', () => {
  let component: MemberPhotoHandlerComponent;
  let fixture: ComponentFixture<MemberPhotoHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPhotoHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPhotoHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
