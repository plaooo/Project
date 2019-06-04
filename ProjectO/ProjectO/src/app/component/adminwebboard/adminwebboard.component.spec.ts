import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminwebboardComponent } from './adminwebboard.component';

describe('AdminwebboardComponent', () => {
  let component: AdminwebboardComponent;
  let fixture: ComponentFixture<AdminwebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminwebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminwebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
