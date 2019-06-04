import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementuserComponent } from './managementuser.component';

describe('ManagementuserComponent', () => {
  let component: ManagementuserComponent;
  let fixture: ComponentFixture<ManagementuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
