import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallsubscriptionComponent } from './getallsubscription.component';

describe('GetallsubscriptionComponent', () => {
  let component: GetallsubscriptionComponent;
  let fixture: ComponentFixture<GetallsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallsubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
