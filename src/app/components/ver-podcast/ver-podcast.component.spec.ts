import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPodcastComponent } from './ver-podcast.component';

describe('VerPodcastComponent', () => {
  let component: VerPodcastComponent;
  let fixture: ComponentFixture<VerPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPodcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
