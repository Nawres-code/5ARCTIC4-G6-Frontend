import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamUserComponent } from './reclam-user.component';

describe('ReclamUserComponent', () => {
  let component: ReclamUserComponent;
  let fixture: ComponentFixture<ReclamUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
