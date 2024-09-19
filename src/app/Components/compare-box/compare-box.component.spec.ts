import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareBoxComponent } from './compare-box.component';

describe('CompareBoxComponent', () => {
  let component: CompareBoxComponent;
  let fixture: ComponentFixture<CompareBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareBoxComponent]
    });
    fixture = TestBed.createComponent(CompareBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
