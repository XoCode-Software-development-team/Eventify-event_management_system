import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBookingRequestsComponent } from './vendor-booking-requests.component';

describe('VendorBookingRequestsComponent', () => {
  let component: VendorBookingRequestsComponent;
  let fixture: ComponentFixture<VendorBookingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorBookingRequestsComponent]
    });
    fixture = TestBed.createComponent(VendorBookingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
