import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListepisodeinniyayComponent } from './listepisodeinniyay.component';

describe('ListepisodeinniyayComponent', () => {
  let component: ListepisodeinniyayComponent;
  let fixture: ComponentFixture<ListepisodeinniyayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListepisodeinniyayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListepisodeinniyayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
