import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceAndResourceComponent } from './all-serviceAndResource.component';

describe('ClientLayoutComponent', () => {
  let component: AllServiceAndResourceComponent;
  let fixture: ComponentFixture<AllServiceAndResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllServiceAndResourceComponent]
    });
    fixture = TestBed.createComponent(AllServiceAndResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
