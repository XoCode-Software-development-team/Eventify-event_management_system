import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoverComponent } from './login-cover.component';

describe('LoginCoverComponent', () => {
  let component: LoginCoverComponent;
  let fixture: ComponentFixture<LoginCoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCoverComponent]
    });
    fixture = TestBed.createComponent(LoginCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
