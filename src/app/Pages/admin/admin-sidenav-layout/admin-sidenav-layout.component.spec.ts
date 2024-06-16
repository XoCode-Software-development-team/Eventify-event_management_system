import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenavLayoutComponent } from './admin-sidenav-layout.component';

describe('AdminSidenavLayoutComponent', () => {
  let component: AdminSidenavLayoutComponent;
  let fixture: ComponentFixture<AdminSidenavLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSidenavLayoutComponent]
    });
    fixture = TestBed.createComponent(AdminSidenavLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
