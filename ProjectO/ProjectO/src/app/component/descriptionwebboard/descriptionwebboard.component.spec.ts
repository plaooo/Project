import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionwebboardComponent } from './descriptionwebboard.component';

describe('DescriptionwebboardComponent', () => {
  let component: DescriptionwebboardComponent;
  let fixture: ComponentFixture<DescriptionwebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionwebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionwebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
