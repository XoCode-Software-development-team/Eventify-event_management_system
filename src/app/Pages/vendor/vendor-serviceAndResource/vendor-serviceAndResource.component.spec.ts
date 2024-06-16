import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorServiceAndResourceComponent } from './vendor-serviceAndResource.component';

describe('VendorServiceAndResourceComponent', () => {
  let component: VendorServiceAndResourceComponent;
  let fixture: ComponentFixture<VendorServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(VendorServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
