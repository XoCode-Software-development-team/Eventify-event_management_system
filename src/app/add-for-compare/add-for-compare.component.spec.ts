import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForCompareComponent } from './add-for-compare.component';

describe('AddForCompareComponent', () => {
  let component: AddForCompareComponent;
  let fixture: ComponentFixture<AddForCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddForCompareComponent]
    });
    fixture = TestBed.createComponent(AddForCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
