import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreatewebboardComponent } from './admincreatewebboard.component';

describe('AdmincreatewebboardComponent', () => {
  let component: AdmincreatewebboardComponent;
  let fixture: ComponentFixture<AdmincreatewebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincreatewebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincreatewebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
