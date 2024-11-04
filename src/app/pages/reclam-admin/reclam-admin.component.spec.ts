import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamAdminComponent } from './reclam-admin.component';

describe('ReclamAdminComponent', () => {
  let component: ReclamAdminComponent;
  let fixture: ComponentFixture<ReclamAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
