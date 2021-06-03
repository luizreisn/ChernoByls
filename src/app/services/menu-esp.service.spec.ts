import { TestBed } from '@angular/core/testing';

import { MenuEspService } from './menu-esp.service';

describe('MenuEspService', () => {
  let service: MenuEspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuEspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
