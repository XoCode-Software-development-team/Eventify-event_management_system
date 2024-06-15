import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceAndResourceComponent } from './admin-serviceAndResource.component';

describe('AdminServiceComponent', () => {
  let component: AdminServiceAndResourceComponent;
  let fixture: ComponentFixture<AdminServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(AdminServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
