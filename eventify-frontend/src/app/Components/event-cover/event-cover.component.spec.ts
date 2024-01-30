import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCoverComponent } from './event-cover.component';

describe('EventCoverComponent', () => {
  let component: EventCoverComponent;
  let fixture: ComponentFixture<EventCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCoverComponent]
    });
    fixture = TestBed.createComponent(EventCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
