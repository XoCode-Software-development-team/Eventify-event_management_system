import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSidenavLayoutComponent } from './vendor-sidenav-layout.component';

describe('VendorSidenavLayoutComponent', () => {
  let component: VendorSidenavLayoutComponent;
  let fixture: ComponentFixture<VendorSidenavLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorSidenavLayoutComponent]
    });
    fixture = TestBed.createComponent(VendorSidenavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
