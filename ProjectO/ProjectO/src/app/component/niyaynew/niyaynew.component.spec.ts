import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiyaynewComponent } from './niyaynew.component';

describe('NiyaynewComponent', () => {
  let component: NiyaynewComponent;
  let fixture: ComponentFixture<NiyaynewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiyaynewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiyaynewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
