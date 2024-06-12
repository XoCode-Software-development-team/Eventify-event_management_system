import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewComponent } from './event-view.component';

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewComponent]
    });
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
