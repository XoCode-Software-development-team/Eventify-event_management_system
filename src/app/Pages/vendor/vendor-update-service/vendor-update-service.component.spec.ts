import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateServiceComponent } from './vendor-update-service.component';

describe('VendorUpdateServiceComponent', () => {
  let component: VendorUpdateServiceComponent;
  let fixture: ComponentFixture<VendorUpdateServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorUpdateServiceComponent]
    });
    fixture = TestBed.createComponent(VendorUpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
