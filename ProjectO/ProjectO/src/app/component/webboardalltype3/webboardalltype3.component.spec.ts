import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Webboardalltype3Component } from './webboardalltype3.component';

describe('Webboardalltype3Component', () => {
  let component: Webboardalltype3Component;
  let fixture: ComponentFixture<Webboardalltype3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Webboardalltype3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Webboardalltype3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
