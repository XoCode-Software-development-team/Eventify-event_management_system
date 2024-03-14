import { ComponentFixture, TestBed } from '@angular/core/testing';

import VendorBookedServicesComponent from './vendor-booked-services.component';

describe('BookedServicesComponent', () => {
  let component: VendorBookedServicesComponent;
  let fixture: ComponentFixture<VendorBookedServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorBookedServicesComponent]
    });
    fixture = TestBed.createComponent(VendorBookedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
