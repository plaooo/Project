import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteadminComponent } from './routeadmin.component';

describe('RouteadminComponent', () => {
  let component: RouteadminComponent;
  let fixture: ComponentFixture<RouteadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
