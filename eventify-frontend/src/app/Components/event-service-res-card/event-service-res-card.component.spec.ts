import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventServiceResCardComponent } from './event-service-res-card.component';

describe('EventServiceResCardComponent', () => {
  let component: EventServiceResCardComponent;
  let fixture: ComponentFixture<EventServiceResCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventServiceResCardComponent]
    });
    fixture = TestBed.createComponent(EventServiceResCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
