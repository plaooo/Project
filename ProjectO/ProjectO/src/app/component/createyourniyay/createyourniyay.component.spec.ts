import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateyourniyayComponent } from './createyourniyay.component';

describe('CreateyourniyayComponent', () => {
  let component: CreateyourniyayComponent;
  let fixture: ComponentFixture<CreateyourniyayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateyourniyayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateyourniyayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
