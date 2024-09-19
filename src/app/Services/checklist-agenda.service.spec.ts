import { TestBed } from '@angular/core/testing';

import { ChecklistAgendaService } from './checklist-agenda.service';

describe('ChecklistAgendaService', () => {
  let service: ChecklistAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
