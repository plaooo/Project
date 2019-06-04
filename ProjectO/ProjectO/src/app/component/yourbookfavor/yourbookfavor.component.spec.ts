import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbookfavorComponent } from './yourbookfavor.component';

describe('RouteComponent', () => {
  let component: YourbookfavorComponent;
  let fixture: ComponentFixture<YourbookfavorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourbookfavorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourbookfavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
