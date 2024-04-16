import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonIconLayoutComponent } from './common-icon-layout.component';

describe('CommonIconLayoutComponent', () => {
  let component: CommonIconLayoutComponent;
  let fixture: ComponentFixture<CommonIconLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonIconLayoutComponent]
    });
    fixture = TestBed.createComponent(CommonIconLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
