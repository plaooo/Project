import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebboardComponent } from './webboard.component';

describe('WebboardComponent', () => {
  let component: WebboardComponent;
  let fixture: ComponentFixture<WebboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
