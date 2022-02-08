import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamerListsComponent } from './gamer-lists.component';

describe('GamerListsComponent', () => {
  let component: GamerListsComponent;
  let fixture: ComponentFixture<GamerListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamerListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamerListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
