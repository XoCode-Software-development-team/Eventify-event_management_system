import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteRequestComponent } from './admin-delete-request.component';

describe('AdminDeleteRequestComponent', () => {
  let component: AdminDeleteRequestComponent;
  let fixture: ComponentFixture<AdminDeleteRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeleteRequestComponent]
    });
    fixture = TestBed.createComponent(AdminDeleteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
