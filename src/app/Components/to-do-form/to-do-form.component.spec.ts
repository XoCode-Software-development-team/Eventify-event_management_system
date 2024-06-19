import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoFormComponent } from './to-do-form.component';

describe('ToDoFormComponent', () => {
  let component: ToDoFormComponent;
  let fixture: ComponentFixture<ToDoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoFormComponent]
    });
    fixture = TestBed.createComponent(ToDoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
