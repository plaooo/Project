import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodelistComponent } from './episodelist.component';

describe('EpisodelistComponent', () => {
  let component: EpisodelistComponent;
  let fixture: ComponentFixture<EpisodelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
