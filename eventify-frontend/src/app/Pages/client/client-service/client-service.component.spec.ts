import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServiceComponent } from './client-service.component';

describe('ClientLayoutComponent', () => {
  let component: ClientServiceComponent;
  let fixture: ComponentFixture<ClientServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientServiceComponent]
    });
    fixture = TestBed.createComponent(ClientServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
