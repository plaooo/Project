import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Webboardalltype2Component } from './webboardalltype2.component';

describe('Webboardalltype2Component', () => {
  let component: Webboardalltype2Component;
  let fixture: ComponentFixture<Webboardalltype2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Webboardalltype2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Webboardalltype2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
