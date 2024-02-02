import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIconComponent } from './nav-icon.component';

describe('NavIconComponent', () => {
  let component: NavIconComponent;
  let fixture: ComponentFixture<NavIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavIconComponent]
    });
    fixture = TestBed.createComponent(NavIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
