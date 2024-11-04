import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergetallComponent } from './usergetall.component';

describe('UsergetallComponent', () => {
  let component: UsergetallComponent;
  let fixture: ComponentFixture<UsergetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergetallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsergetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
