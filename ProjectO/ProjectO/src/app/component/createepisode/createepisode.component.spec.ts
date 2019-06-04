import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateepisodeComponent } from './createepisode.component';

describe('CreateepisodeComponent', () => {
  let component: CreateepisodeComponent;
  let fixture: ComponentFixture<CreateepisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateepisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateepisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
