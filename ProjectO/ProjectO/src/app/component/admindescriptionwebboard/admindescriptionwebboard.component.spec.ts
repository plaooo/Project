import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindescriptionwebboardComponent } from './admindescriptionwebboard.component';

describe('AdmindescriptionwebboardComponent', () => {
  let component: AdmindescriptionwebboardComponent;
  let fixture: ComponentFixture<AdmindescriptionwebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindescriptionwebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindescriptionwebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
