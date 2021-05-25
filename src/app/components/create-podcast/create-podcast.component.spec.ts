import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePodcastComponent } from './create-podcast.component';

describe('CreatePodcastComponent', () => {
  let component: CreatePodcastComponent;
  let fixture: ComponentFixture<CreatePodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePodcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
