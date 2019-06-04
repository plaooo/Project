import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatewebboardComponent } from './createwebboard.component';

describe('CreatewebboardComponent', () => {
  let component: CreatewebboardComponent;
  let fixture: ComponentFixture<CreatewebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatewebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatewebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
