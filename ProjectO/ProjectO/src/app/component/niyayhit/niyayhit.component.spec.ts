import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiyayhitComponent } from './niyayhit.component';

describe('NiyayhitComponent', () => {
  let component: NiyayhitComponent;
  let fixture: ComponentFixture<NiyayhitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiyayhitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiyayhitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
