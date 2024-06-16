import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorIconLayoutComponent } from './vendor-icon-layout.component';

describe('VendorIconLayoutComponent', () => {
  let component: VendorIconLayoutComponent;
  let fixture: ComponentFixture<VendorIconLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorIconLayoutComponent]
    });
    fixture = TestBed.createComponent(VendorIconLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
