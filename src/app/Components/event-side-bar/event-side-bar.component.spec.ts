import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSideBarComponent } from './event-side-bar.component';

describe('EventSideBarComponent', () => {
  let component: EventSideBarComponent;
  let fixture: ComponentFixture<EventSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventSideBarComponent]
    });
    fixture = TestBed.createComponent(EventSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
