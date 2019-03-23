import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacPage } from './mac.page';

describe('MacPage', () => {
  let component: MacPage;
  let fixture: ComponentFixture<MacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
