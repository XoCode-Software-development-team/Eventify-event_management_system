import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIconLayoutComponent } from './client-icon-layout.component';

describe('ClientIconLayoutComponent', () => {
  let component: ClientIconLayoutComponent;
  let fixture: ComponentFixture<ClientIconLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientIconLayoutComponent]
    });
    fixture = TestBed.createComponent(ClientIconLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
