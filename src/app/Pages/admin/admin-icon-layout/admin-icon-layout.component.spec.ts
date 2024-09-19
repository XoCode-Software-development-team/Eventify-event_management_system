import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIconLayoutComponent } from './admin-icon-layout.component';

describe('AdminIconLayoutComponent', () => {
  let component: AdminIconLayoutComponent;
  let fixture: ComponentFixture<AdminIconLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIconLayoutComponent]
    });
    fixture = TestBed.createComponent(AdminIconLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
