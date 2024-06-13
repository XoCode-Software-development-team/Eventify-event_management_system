import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowComparisonComponent } from './show-comparison.component';

describe('ShowComparisonComponent', () => {
  let component: ShowComparisonComponent;
  let fixture: ComponentFixture<ShowComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComparisonComponent]
    });
    fixture = TestBed.createComponent(ShowComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
