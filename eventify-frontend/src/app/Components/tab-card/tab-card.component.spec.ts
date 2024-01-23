import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCardComponent } from './tab-card.component';

describe('TabCardComponent', () => {
  let component: TabCardComponent;
  let fixture: ComponentFixture<TabCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabCardComponent]
    });
    fixture = TestBed.createComponent(TabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
