import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateServiceAndResourceComponent } from './vendor-update-service.AndResourcecomponent';

describe('VendorUpdateServiceAndResourceComponent', () => {
  let component: VendorUpdateServiceAndResourceComponent;
  let fixture: ComponentFixture<VendorUpdateServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorUpdateServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(VendorUpdateServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
