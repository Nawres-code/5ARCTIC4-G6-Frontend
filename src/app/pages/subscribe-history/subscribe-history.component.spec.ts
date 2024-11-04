import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeHistoryComponent } from './subscribe-history.component';

describe('SubscribeHistoryComponent', () => {
  let component: SubscribeHistoryComponent;
  let fixture: ComponentFixture<SubscribeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
