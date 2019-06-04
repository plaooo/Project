import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListyourniyayComponent } from './listyourniyay.component';

describe('ListyourniyayComponent', () => {
  let component: ListyourniyayComponent;
  let fixture: ComponentFixture<ListyourniyayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListyourniyayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListyourniyayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
