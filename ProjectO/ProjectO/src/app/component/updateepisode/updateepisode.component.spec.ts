import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateepisodeComponent } from './updateepisode.component';

describe('UpdateepisodeComponent', () => {
  let component: UpdateepisodeComponent;
  let fixture: ComponentFixture<UpdateepisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateepisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateepisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
