import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamUserlistComponent } from './reclam-userlist.component';

describe('ReclamUserlistComponent', () => {
  let component: ReclamUserlistComponent;
  let fixture: ComponentFixture<ReclamUserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamUserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
