import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddNewServiceAndResourceComponent } from './vendor-add-new-serviceAndResource.component';

describe('VendorAddNewServiceAndResourceComponent', () => {
  let component: VendorAddNewServiceAndResourceComponent;
  let fixture: ComponentFixture<VendorAddNewServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorAddNewServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(VendorAddNewServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
