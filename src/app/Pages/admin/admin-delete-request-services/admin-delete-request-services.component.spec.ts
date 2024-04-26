import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteRequestServicesComponent } from './admin-delete-request-services.component';

describe('AdminDeleteRequestServicesComponent', () => {
  let component: AdminDeleteRequestServicesComponent;
  let fixture: ComponentFixture<AdminDeleteRequestServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteRequestServicesComponent]
    });
    fixture = TestBed.createComponent(AdminDeleteRequestServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
