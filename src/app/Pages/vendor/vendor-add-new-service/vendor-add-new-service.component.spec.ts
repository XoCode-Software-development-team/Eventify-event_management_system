import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddNewServiceComponent } from './vendor-add-new-service.component';

describe('VendorAddNewServiceComponent', () => {
  let component: VendorAddNewServiceComponent;
  let fixture: ComponentFixture<VendorAddNewServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorAddNewServiceComponent]
    });
    fixture = TestBed.createComponent(VendorAddNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
