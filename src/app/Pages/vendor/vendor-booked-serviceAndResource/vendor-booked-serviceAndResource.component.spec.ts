import { ComponentFixture, TestBed } from '@angular/core/testing';

import VendorBookedServiceAndResourceComponent from './vendor-booked-serviceAndResource.component';

describe('BookedServicesComponent', () => {
  let component: VendorBookedServiceAndResourceComponent;
  let fixture: ComponentFixture<VendorBookedServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorBookedServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(VendorBookedServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
