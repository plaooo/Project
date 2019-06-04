import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebboardallComponent } from './webboardall.component';

describe('WebboardallComponent', () => {
  let component: WebboardallComponent;
  let fixture: ComponentFixture<WebboardallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebboardallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebboardallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
